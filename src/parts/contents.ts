
import { Con } from "../con/con";
import { Conf } from "../core/conf";
import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Param } from "../core/param";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _txt:HTMLElement;

  constructor(opt:any) {
    super(opt)

    this._txt = document.querySelector('.l-main p') as HTMLElement;
    let t = ''
    for(let i = 0; i < Conf.instance.TEXT_NUM; i++) {
      t += Util.instance.randomArr('ABCDEFGHIKLMNOPRSTUVWXYZ0123456789'.split(''));
    }
    this._txt.innerHTML = t;

    new Con({
      el:document.querySelector('.l-canvas')
    });
  }


  protected _update(): void {
    super._update();

    Tween.instance.set(this.getEl(), {
      height:Func.instance.sh()
    })

    // const s = window.getSelection()?.toString();
    const start = window.getSelection()?.anchorOffset || 0;
    const end = window.getSelection()?.focusOffset || 0;

    const max = Conf.instance.TEXT_NUM
    Param.instance.selectedNo[0] = Math.min(1, start / max);
    Param.instance.selectedNo[1] = Math.min(1, end / max);

    Param.instance.debug.innerHTML = start + '_' + end + '_' + Param.instance.selectedNo[0] + '_' + Param.instance.selectedNo[1];
  }
}