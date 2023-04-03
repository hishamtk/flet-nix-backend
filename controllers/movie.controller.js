import Movie from "../model/Movie.model.js";

/**
 * Get all Movie Controller
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

let getAllMovieController = async (req, res) => {
  try {
    let user = req.user;

    const { page = 1, limit = 15, search, sort, order , type } = req.query;

    let query = {};
    if(user.age < 18){
      query.rating = {$ne : "R"}
    }
    if(type){
      query.type = type;
    }
    if(search){
      query.$or=[
        { title: new RegExp(search, "i") },
        { cast: new RegExp(search, "i") },
      ]
    }


    let movies = await Movie.find(query)
      .select("_id show_id cast title type rating")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sort,order]]);

    // get total documents in the Movie collection
    const count = await Movie.countDocuments(query);
    return res.status(200).json({
      movies,
      totalPages: Math.ceil(count / limit),
      currentPage: +page,
      type: "data",
    });
  } catch (error) {
    res.status(500).json({ info: "internal server error", type: "error" });
    console.log(error);
  }
};

let getOneMovieController = async (req, res) => {
  try {
    let {id} = req.params;
    let movie = await Movie.find({ _id: id });

    return res.status(200).json({
      movie,
      type: "data",
    });
  } catch (error) {
    res.status(500).json({ info: "internal server error", type: "error" });
    console.log(error);
  }
};

export { getAllMovieController, getOneMovieController };
