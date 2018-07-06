/**
 * Created by september on 2018/6/29.
 */

module.export = {
    errorHandle (ctx, next) {
        return next().catch((err) => {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body = {
                    error: err.originalError ? err.originalError.message : err.message,
                };
            } else {
                throw err;
            }
        });
    }
}

