const popupAnimation = {
  initial: {
    y: "50px",
    x: "50%",
    opacity: 0,
  },

  animate: () => ({
    y: "0px",
    x: "50%",
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  }),
};

export default popupAnimation;
