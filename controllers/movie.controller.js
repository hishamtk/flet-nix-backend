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

    const {
      page = 1,
      limit = 15,
      search,
      sort = title,
      order = "asc",
      type,
    } = req.query;

    let query = [
      {
        $project: {
          date_added: {
            $dateFromString: {
               dateString: '$date_added'
            }
         },
          show_id: 1,
          cast: 1,
          title: 1,
          type: 1,
          rating: 1,
        },
      },
    ];

    if (search) {
      query.push({
        $match: {
          $or: [
            { title: new RegExp(search, "i") },
            { cast: new RegExp(search, "i") },
          ],
        },
      });
    }

    if (type) {
      query.push({
        $match: {
          type: type,
        },
      });
    }

    if (user.age < 18) {
      query.push({
        $match: {
          rating: { $ne: "R" },
        },
      });
    }

    const count = await Movie.countDocuments(query);
    let skip = (page - 1) * limit;

   
    if (sort && order) {
      let sortObje = {};
      sortObje[sort] = order == "asc" ? 1 : -1;
      query.push({ $sort: sortObje });
    }
    query.push({ $skip: skip });
    query.push({ $limit: limit });

    let movies = await Movie.aggregate(query);

    // get total documents in the Movie collection
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
    let { id } = req.params;
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
