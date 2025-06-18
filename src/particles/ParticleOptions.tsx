const particleOptions = {
  background: {
    color: {
      value: "red",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "repulse",
      },
      onHover: {
        enable: true,
        mode: ["connect", "bubble", "light"], // bubble, attract, trail, light, slow, connect, grab, repulse
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 10,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      grab: {
        distance: 150,
        links: {
          opacity: 1,
        },
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 0.8,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};

export default particleOptions;
