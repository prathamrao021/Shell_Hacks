from pydantic import BaseModel
from models.auth import UserResponse

class BaseResponse(BaseModel):
    message: str
    statusCode: int
    success: bool


class RegisterAndCurrentUserResponse(BaseResponse):
    data: UserResponse


class EmailVerificationData(BaseModel):
    isEmailVerified: bool


class EmailVerificationResponse(BaseResponse):
    data: EmailVerificationData


class RefreshTokenData(BaseModel):
    accessToken: str
    refreshToken: str


class RefreshTokenResponse(BaseResponse):
    data: RefreshTokenData


class LoginData(BaseModel):
    accessToken: str
    refreshToken: str
    user: UserResponse


class LoginResponse(BaseResponse):
    data: LoginData