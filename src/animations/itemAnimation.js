const itemAnimation = {
  initial: {
    y: 10,
    opacity: 0,
  },

  animate: ({ index, time }) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.5,
      delay: time * index,
    },
  }),
};

export default itemAnimation;
