const itemAnimation = {
  initial: {
    x: -100,
    opacity: 0,
  },

  animate: () => ({
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  }),
};

export default itemAnimation;
