import request from "@/utils/request.js";

//提供调用注册接口的函数
export const userRegisterService = (registerData) => {
    const params = new URLSearchParams()
    for (let key in registerData) {
        params.append(key, registerData[key])
    }
    return request.post('/user/register', params);
}

//提供调用登陆接口的函数
export const userLoginService = (registerData) => {
    const params = new URLSearchParams()
    for (let key in registerData) {
        params.append(key, registerData[key])
    }
    return request.post('/user/login', params);
}

//获取个人信息
export const userInfoGetService = () => {
    return request.get('/user/userInfo');
}

//修改个人信息
export const userInfoUpdateService = (userInfo) => {
    return request.put('/user/update', userInfo)
}

//修改头像
export const userAvatarUpdateService = (avatarUrl) => {
    const params = new URLSearchParams()
    params.append('avatarUrl', avatarUrl)
    return request.patch('/user/updateAvatar', params)
}

//修改密码
export const userResetPasswordUpdateService = (resetPasswordData) => {
    return request.patch('/user/updatePwd', resetPasswordData)
}