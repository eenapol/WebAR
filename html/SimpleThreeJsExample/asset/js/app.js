//             别间隔时间(毫秒), 识别服务地址
const webAR = new WebAR(1000, 'https://cn1-crs.easyar.com:8443/search','RQ5C8TBZouP2e+4hnpeKgTH891n6AGpXD6LTRPCZprFIn0D1UhUFGowrhxv8l0G5w0KZhMMWE98DyU0i99v9wA==');
// Threejs简单使用类
const threeHelper = new ThreeHelper();
// 列出并打开设备上的摄像头
document.querySelector('#openCamera').addEventListener('click', function () {
    const videoSelect = document.querySelector('#videoDevice');
    webAR.listCamera(videoSelect)
        .then(msg => {
        // 隐藏"打开摄像头"按钮
        this.style.display = 'none';
        videoSelect.style.display = 'inline-block';
        document.querySelector('#start').style.display = 'inline-block';
        document.querySelector('#stop').style.display = 'inline-block';
        videoSelect.onchange = () => {
            webAR.openCamera(JSON.parse(videoSelect.value));
        };
        // 打开摄像头
        // 打开后置摄像头参数： {audio: false, video: {facingMode: {exact: 'environment'}}}
        webAR.openCamera(JSON.parse(videoSelect.value))
            .then(msg => {
            console.info(msg);
        }).catch(err => {
            console.info(err);
        });
    })
        .catch(err => {
        // 没有找到摄像头
        console.info(err);
    });
});
// 开启识别
document.querySelector('#start').addEventListener('click', () => {
    webAR.startRecognize((msg) => {
        console.info(msg);
        // 可以将 setting 作为meta上传到EasyAR的云识别，使用方法如下
        // const setting = window.atob(msg.meta);
        const setting = {
            model: 'asset/model/trex_v3.fbx',
            scale: 0.02,
            position: [0, 0, 0]
        };
        threeHelper.loadObject(setting);
    });
}, false);
// 暂停识别
document.querySelector('#stop').addEventListener('click', () => {
    webAR.stopRecognize();
}, false);
//# sourceMappingURL=app.js.map