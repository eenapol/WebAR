class ThreeHelper {
    constructor() {
        this.loadobj = null;
        this.mixers = [];
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AmbientLight(0xFFFFFF));
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(-30, 30, 25);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.domElement.setAttribute('class', 'mainCanvas');
        document.body.appendChild(this.renderer.domElement);
        this.clock = new THREE.Clock();
        this.mixers = [];
        window.addEventListener('resize', () => {
                                this.camera.aspect = window.innerWidth / window.innerHeight;
                                this.camera.updateProjectionMatrix();
                                this.renderer.setSize(window.innerWidth, window.innerHeight);
                                }, false);
        this.control = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.control.update();
        this.render();
    }
    render() {
        this.renderer.render(this.scene, this.camera);
        for (const mixer of this.mixers) {
            mixer.update(this.clock.getDelta());
        }
        window.requestAnimationFrame(() => {
                                     this.render();
                                     });
    }
    loadObject(setting) {
        const loader = new THREE.FBXLoader();
        loader.load(setting.model, (object) => {
                    this.loadobj = object;
                    object.scale.setScalar(setting.scale);
                    object.position.set(setting.position[0], setting.position[1], setting.position[1]);
                    
                    object.name = "test_name";
                    // let mat = new THREE.MeshPhongMaterial({
                    //     color: new THREE.Color(0xffffff),
                    //     // 导入纹理贴图
                    //     map: THREE.TextureLoader.loadTexture('img/img1.jpg')
                    // });
                    //let m_object = new THREE.Mesh(object, mat);
                    //m_object.castShadow = true;
                    
                    // let mat2 = new THREE.MeshBasicMaterial({
                    //     color: 0xff0000,
                    //     // 绘制为线框
                    //     wireframe: true
                    // });
                    // 创建立方体几何模型
                    //let cube1 = new THREE.BoxGeometry(10, 20, 30, 1, 1, 1);
                    // 混合模型与材质
                    //let m_object = new THREE.Mesh(object, mat);
                    
                    var textureLoader = new THREE.TextureLoader();
                    textureLoader.setCrossOrigin("anonymous");
                    var texture= textureLoader.load("./asset/img/img6.jpg");
                    //https://picsum.photos/id/267/256/256
                    //var texture= textureLoader.load("https://unsplash.it/256");
                    console.log(texture);
                    // mesh is a group contains multiple sub-objects. Traverse and apply texture to all.
                    object.traverse(function (child) {
                                    if (child instanceof THREE.Mesh) {
                                    //console.log(texture);
                                    // apply texture
                                    child.material.map = texture
                                    child.material.needsUpdate = true;
                                    }
                                    });
                    
                    
                    //var mat = new THREE.MeshPhongMaterial();
                    //mat.map = texture;
                    
                    //object = new THREE.Mesh(object, mat);
                    //scene.add(object);
                    
                    
                    this.scene.add(object);
                    if (object.animations.length > 0) {
                    object.mixer = new THREE.AnimationMixer(object);
                    this.mixers.push(object.mixer);
                    object.mixer.clipAction(object.animations[0]).play();
                    }
                    });
    }
    
    removeObject(){
        if(this.loadobj){
            //this.scene.remove(this.loadobj.name);
            //this.loadobj = null;
            var selectedObject = this.scene.getObjectByName(this.loadobj.name);
            this.scene.remove( selectedObject );
            this.loadobj = null;
            //animate();
        }
    }
}
//# sourceMappingURL=ThreeHelper.js.map
