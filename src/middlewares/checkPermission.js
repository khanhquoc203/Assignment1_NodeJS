import jwt from "jsonwebtoken";
import User from "../models/user";

export const checkPermission = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({
                message: "Bạn chưa đăng nhập",
            });
        }
        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, "banThayDat", async (err, payload) => {
            if (err) {
                if (err.name === "JsonWebTokenError") {
                    return res.json({
                        message: "Token không hợp lệ"
                    })
                }
                if (err.name === "TokenExpiredError") {
                    return res.json({
                        message: "Token hết hạn"
                    })
                }
            }
            const user = await User.findById(payload._id);

            if (user.role != "admin") {
                return res.json({
                    message: "không có quyền thực hiện hành động"
                })
            }
            req.user = user;
            next();
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
};
// B1: Kiểm tra trong header.authorization có token không? Nếu không có thì trả về lỗi
// B2: Kiểm tra token có hợp lệ không? Nếu hợp lệ thì decode
// B3: Dựa vào ID ở token sau khi decode để tìm user trong db
// B4: Check quyền (role), nếu user không phải admin thì thông báo lỗi
// B5: Cho đi bước tiếp theo