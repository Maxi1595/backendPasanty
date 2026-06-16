export const successResponse = (res, data, status) => {
    return res.status(status).json({
        data,
    });
}

export const errorResponse = (res, mensaje, status) => {
    return res.status(status).json({
        mensaje,
    })
}