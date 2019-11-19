//             别间隔时间(毫秒), 识别服务地址, 认证token
const webAR = new WebAR(1000, 'https://cn1-crs.easyar.com:8443/search','ghwYz5YIX22vyqUw+mjdymj1t2X2hm98jsb05jtEaYcq0mbiDnRKjetrjzPvCFPnTEBcqxwPBu1K3+njlEhzww==');
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
		document.querySelector('#videoDevice').style.display = 'none';
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
  threeHelper.removeObject();
    webAR.startRecognize((msg) => {
        console.info(msg);
        // 可以将 setting 作为meta上传到EasyAR的云识别，使用方法如下
        // const setting = JSON.parse(window.atob(msg.target.meta));
		
		//0054ac0e-010a-495e-97a3-5196d5d1e6f1
		//011ac7e7-d1a8-4d2c-89ed-574ea2c3a1f7
		var m_scale = 1;
		var m_model = '';
		//console.log(msg.target.targetId);
		var targetId = msg.target.targetId;
		if(targetId=='0054ac0e-010a-495e-97a3-5196d5d1e6f1'){
			//m_scale = 0.01;
      //m_model = 'asset/model/trex_v3.fbx';
      m_scale = 20;
      m_model = 'asset/model/box1.fbx';
		}else{
			//m_scale = 2;
      //m_model = 'asset/model/box2.fbx';
      
      m_scale = 2;
			m_model = 'asset/model/box2.fbx';
		}
		
        const setting = {
            model: m_model,
            scale: m_scale,
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

// 物体添加
const addObjs = () => {
  let cube = new THREE.BoxGeometry(20, 20, 20);
  // 使用Phong网孔材料
  let mat = new THREE.MeshPhongMaterial({
      color: new THREE.Color(0xffffff),
      // 导入纹理贴图
      map: THREE.ImageUtils.loadTexture('img/crate.jpg')
  });
  let m_cube = new THREE.Mesh(cube, mat);
  m_cube.castShadow = true;
  this.scene.add(m_cube);
}


// 改变材质种类
const changeMaterial = () => {
  // 实例化一个加载器loader
  const loader = new THREE.TextureLoader();

// 加载一张材质图片
  loader.load(
    // 'floors/FloorsCheckerboard_S_Diffuse.jpg',   // 本地路径的图片
    'http://renyuan.bos.xyz/FloorsCheckerboard_S_Diffuse.jpg', // 远程图片的地址
    // 加载完贴图后的回调函数
    function (texture) {
      // 当材质加载完成之后，我们创建一个新的mesh对象，为这个对象创建几何和材质，为材质附上一张贴图
      const material = new THREE.MeshLambertMaterial({
        map: texture // 将材质的map属性设置为加载的图片
      });
      const geometry = new THREE.BoxGeometry(100, 100, 100);  // 一个正方体几何体，长宽高都为100
      const cube = new THREE.Mesh(geometry, material);  // 创建这个mesh对象

      // cube.position.set(-120,60,60); // 为这个新建的几何体设置一个位置，设置在场景内正方体的旁边
      //cube.position.copy(vizbim.components[componentid].position); // 为这个新建的几何体设置一个位置，设置在场景内正方体的旁边
      cube.position.x -= 200;
      cube.position.z += 50;

      ThreeHelper.scene.add(cube); // 将新创建的带贴图的几何体添加到场景内，我们就可以看到了
    },

    // 目前不支持加载贴图过程中的回调函数
    undefined,

    // 加载出错时候的回调函数
    function (err) {
      console.error('An error happened.');
    }
  );
}
