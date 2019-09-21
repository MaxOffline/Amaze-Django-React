// renderNewArrivals = () => {
// newSlide.startSlider(this.refs.newarrivals, this.props.newArrivals);

// const nodes = this.refs.newarrivals;
// if (nodes.childNodes) {
//   nodes.childNodes.forEach(element => (element.className = "hide"));
//   nodes.childNodes[0].className = "show";
//   const slideMeBabe = (startingIndex, endingIndex, timer) => {
//     let sliderStartingIndex = 0;
//     if (startingIndex) {
//       sliderStartingIndex = startingIndex;
//     }
//     function updateNodes() {
//       nodes.childNodes.forEach(element => {
//         element.className = "hide";
//       });
//       nodes.childNodes[sliderStartingIndex].className = "show";
//     }
//     function inter() {
//       if (sliderStartingIndex === endingIndex) {
//         updateNodes();
//         sliderStartingIndex = 0;
//       } else {
//         updateNodes();
//         sliderStartingIndex++;
//       }
//     }
//     setInterval(inter, timer || 2000);
//   };
//   slideMeBabe(0, this.props.newArrivals.length - 1, 2000);
// }
//   return;
// };
