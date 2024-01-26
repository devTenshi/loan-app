export const validateSchema = (schema) => async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        // query: req.query,
        // params: req.params,
      });
      return next();
    } catch (error) {
      logger.error(error);
        return res.status(400).json({
            status: "error",
            message: `invalid body parameter(s)`,
            data: {
                error: error.issues,
                status: "error",
                message: `invalid body parameter(s)`,
                data: {
                    error: error.issues,
                    statusCode: 400,
                    timestamp: new Date().toISOString(),
                },
            }
        });
      }
    };