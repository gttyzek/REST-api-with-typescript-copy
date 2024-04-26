import { Request, NextFunction } from "express";

export function pagination(model: any) {
  return async function paginate(req: Request, res: any, next: NextFunction) {
    const params = req.query.page as string;
    const params__ = req.query.limit as string;
    const page = parseInt(params);
    const limit = parseInt(params__);

    if (!page && !limit) {
      const result = await model.find().exec();
      // console.log(result)
      if (result.length === 0) {
        res.status(404).send({
          status: "Failed",
          result,
        });
        return;
      }
      res.status(200).send({
        status: "success",
        result,
      });
      return;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results: any = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      //   res.status(200).send(result);
      res.paginatedResults = results;
      next();
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };
}
