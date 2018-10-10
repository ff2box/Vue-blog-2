const axiosRes = (response) => {
    switch (response.data.code) {
        // case 0:
        //     break;
        case -1:
            alert(`${response.data.msg}，\r\n请登录！`);
            break;
        case 1000:  //token缺失
        case 1001:  //token不合法
        case 1002:  //token过期
            console.log(response.request.responseURL);
            alert(`${response.data.msg}，\r\n请登录！`);
            this.$router.push('/login?sign=1');
            // return;  //统一拦截
            break;
    }
};
export default {
    axiosRes,
}