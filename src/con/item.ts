import vs from '../glsl/simple.vert';
import fs from '../glsl/item.frag';
import { MyObject3D } from "../webgl/myObject3D";
import { Util } from "../libs/util";
import { Mesh } from 'three/src/objects/Mesh';
import { FrontSide } from 'three/src/constants';
import { Func } from "../core/func";
import { Vector3 } from "three/src/math/Vector3";
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { Color } from 'three/src/math/Color';
import { Object3D } from "three/src/core/Object3D";
import { Conf } from "../core/conf";
import { Param } from '../core/param';

export class Item extends MyObject3D {

  private _mesh:Array<Object3D> = []
  private _id:number

  public itemSize:Vector3 = new Vector3()

  constructor(opt:any = {}) {
    super()

    this._id = opt.id

    const geo = opt.geo
    let col = ~~(this._id / 8) % 2 == 0 ? opt.col[0] : opt.col[1]

    let num = 4
    for(let i = 0; i < num; i++) {
      const m = new Mesh(
        geo,
        new ShaderMaterial({
          vertexShader:vs,
          fragmentShader:fs,
          transparent:true,
          side:FrontSide,
          uniforms:{
            alpha:{value:1},
            color:{value:new Color(col)},
            addColRate:{value:0},
            addCol:{value:new Color(Util.instance.randomArr(opt.col))},
          }
        })
      )
      this.add(m)
      this._mesh.push(m)
    }

    this.visible = true
  }


  // ---------------------------------
  // 更新
  // ---------------------------------
  protected _update():void {
    super._update()

    const sw = Func.instance.sw()
    const sh = Func.instance.sh()
    const baseSize = Func.instance.val(sw, sw * 0.4)

    const rate = Param.instance.selectedNo[1];
    this.visible = Util.instance.map(this._id, 0, 1, 0, Conf.instance.ITEM_NUM - 1) < rate

    // 基本サイズ
    this.itemSize.x = baseSize * 0.5
    this.itemSize.y = (sh * 1) / Conf.instance.ITEM_NUM

    // 真ん中の
    const centerSize = this.itemSize.x * 0.75
    let w = (this.itemSize.x - centerSize) * 0.5
    let h = this.itemSize.y

    this._mesh[0].scale.set(w, h, this.itemSize.x)
    this._mesh[0].position.x = this.itemSize.x * -0.5 + w * 0.5
    this._mesh[0].position.y = 0
    this._mesh[0].position.z = 0

    this._mesh[1].scale.set(this.itemSize.x, h, w)
    this._mesh[1].position.z = this.itemSize.x * -0.5 + w * 0.5
    this._mesh[1].position.x = 0
    this._mesh[1].position.y = 0

    this._mesh[2].scale.set(w, h, this.itemSize.x)
    this._mesh[2].position.x = this.itemSize.x * 0.5 - w * 0.5
    this._mesh[2].position.y = 0
    this._mesh[2].position.z = 0

    this._mesh[3].scale.set(this.itemSize.x, h, w)
    this._mesh[3].position.z = this.itemSize.x * 0.5 - w * 0.5
    this._mesh[3].position.x = 0
    this._mesh[3].position.y = 0

    const rate2 = Param.instance.selectedNo[0];
    this.rotation.y = 0
    this.rotation.y += rate2 * this._id * 0.1;
  }


}