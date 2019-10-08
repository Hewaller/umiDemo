import React, { Component } from 'react';
import { WOW } from 'wowjs';
import style from './index.less';
import 'animate.css';

class Wow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const wow = new WOW({
      boxClass: 'wow', // animated element css class (default is wow) 需要执行动画的元素的 class（默认为wow）
      animateClass: 'animated', // animation css class (default is animated) animation.css 动画的 class(默认animated)
      offset: 0, // distance to the element when triggering the animation (default is 0) 距离可视区域多少开始执行动画
      mobile: true, // trigger animations on mobile devices (default is true) 是否在移动设备上执行动画
      live: true, // act on asynchronously loaded content (default is true) 异步加载的内容是否有效
      callback: function(box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null, // optional scroll container selector, otherwise use window
    });
    wow.init();
  }
  render() {
    return (
      // 防闪烁： .wow{visible: hidden}
      <div>
        {/* data-wow-duration（动画持续时间）和 data-wow-delay（动画延迟时间）， data-wow-offset（元素的位置露出后距离底部多少像素执行）和data-wow-iteration（动画执行次数）， 必须设置为块状或者行内块状 */}
        <section className="wow slideInLeft" data-wow-duration="1s" data-wow-delay="1s">
          <div className={style.container}>1</div>
        </section>
        <section className="wow slideInRight" data-wow-duration="1s" data-wow-delay="2s">
          <div className={style.container}>2</div>
        </section>
        <section className="wow slideInLeft" data-wow-duration="2s" data-wow-delay="1s">
          <div className={style.container}>3</div>
        </section>
        <section className="wow slideInRight" data-wow-duration="2s" data-wow-delay="2s">
          <div className={style.container}>4</div>
        </section>
        <section className="wow slideInLeft" data-wow-duration="1s" data-wow-delay="1s">
          <div className={style.container}>5</div>
        </section>
        <section className="wow slideInLeft" data-wow-duration="1s" data-wow-delay="1s">
          <div className={style.container}>6</div>
        </section>
        <section className="wow slideInLeft" data-wow-duration="1s" data-wow-delay="1s">
          <div className={style.container}>7</div>
        </section>
        <section className="wow slideInLeft" data-wow-duration="1s" data-wow-delay="1s">
          <div className={style.container}>8</div>
        </section>
        <section className="wow slideInLeft" data-wow-duration="1s" data-wow-delay="1s">
          <div className={style.container}>9</div>
        </section>
      </div>
    );
  }
}

export default Wow;
