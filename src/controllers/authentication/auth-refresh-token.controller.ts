import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const refreshTokenController = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ message: "Refresh token байхгүй байна." });
    return;
  }

  try {
    const decodedToken = jwt.verify(refreshToken, JWT_SECRET) as {
      email: string;
      _id?: string;
    };

    const accessToken = jwt.sign(
      {
        email: decodedToken.email,
        _id: decodedToken._id,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      success: true,
      accessToken,
      user: {
        email: decodedToken.email,
      },
    });
  } catch (error) {
    res
      .status(403)
      .json({ message: "Refresh token хүчингүй эсвэл хугацаа дууссан байна." });
  }
};
