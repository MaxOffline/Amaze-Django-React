// class Slider {
//   constructor() {
//     this.links = [];
//     this.sliderIndex = 0;
//     this.forward = true;
//     this.nodes = "";
//   }

//   updateNodes() {
//     if (this.nodes) {
//       for (let index = 0; index < this.nodes.childNodes.length - 2; index++) {
//         this.nodes.childNodes[index].firstChild.className = "hide";
//       }

//       this.nodes.childNodes[this.sliderIndex].firstChild.className = "show";
//     }
//   }

//   inter() {
//     if (this.forward === true) {
//       if (this.sliderIndex === 2) {
//         this.updateNodes();
//         this.sliderIndex = 0;
//       } else {
//         this.updateNodes();
//         this.sliderIndex++;
//       }
//     } else {
//       if (this.sliderIndex === 0) {
//         this.updateNodes();
//         this.sliderIndex = 2;
//       } else {
//         this.updateNodes();
//         this.sliderIndex--;
//       }
//     }
//   }

//   handleNextClick() {
//     this.forward = true;
//     this.inter();
//   }

//   handlePrevClick() {
//     this.foward = false;
//     this.inter();
//   }

//   startSlider(refs, products) {
//     this.nodes = refs;
//     this.links = products.map(product => product.imgUrl);
//     this.inter();
//   }
// }

// export default Slider;
