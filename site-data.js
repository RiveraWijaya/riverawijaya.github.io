window.PORTFOLIO_DATA = {
  profile: {
    siteTitle: "Rivera Wijaya — Electrical Engineering",

    name: "Rivera Wijaya",

    headerName: "Rivera Wijaya",

    headerMark:
      "RW",

    eyebrow:
      "Electrical Engineering · University of Toronto",

    headline:
      "Engineering work across RTL, firmware, and mixed-signal hardware.",

    intro:
      "FPGA/RTL, embedded firmware, RF, and power electronics—designed with verification, measurement, and real hardware bring-up in mind.",

    location:
      "Toronto, Canada",

    availability:
      "Open to FPGA / RTL / embedded opportunities",

    email:
      "your.email@example.com",

    github:
      "https://github.com/your-username",

    linkedin:
      "https://www.linkedin.com/in/your-profile",

    resumeUrl: "",
  },

  categories: {
    digital: {
      label:
        "Digital Hardware",

      shortLabel:
        "Digital",

      number:
        "01",

      kicker:
        "RTL · FPGA · Computer Architecture",

      description:
        "Pipelined datapaths, protocol engines, DSP blocks, and complete FPGA systems—built from timing diagrams to self-checking verification and board bring-up.",

      accent:
        "cyan",

      page:
        "digital.html",

      skills: [
        "SystemVerilog",
        "Verilog",
        "FPGA",
        "SVA",
        "cocotb",
        "Quartus",
        "Vivado",
        "Timing analysis",
      ],
    },

    firmware: {
      label:
        "Embedded Firmware",

      shortLabel:
        "Firmware",

      number:
        "02",

      kicker:
        "C · Protocols · Hardware Bring-up",

      description:
        "Low-level software for real hardware: command parsing, checksums, peripheral drivers, interrupt-driven control, and methodical debugging across the hardware/software boundary.",

      accent:
        "amber",

      page:
        "firmware.html",

      skills: [
        "C",
        "UART",
        "I²C",
        "SPI",
        "Interrupts",
        "Embedded debugging",
        "Zephyr",
        "Git",
      ],
    },

    analog: {
      label:
        "Analog + RF",

      shortLabel:
        "Analog / RF",

      number:
        "03",

      kicker:
        "RF · Power Electronics · PCB Design",

      description:
        "Power conversion and RF signal chains developed through simulation, component tradeoffs, layout-aware design, bench measurement, and iterative tuning.",

      accent:
        "coral",

      page:
        "analog.html",

      skills: [
        "LTspice",
        "KiCad",
        "RF matching",
        "Power electronics",
        "Oscilloscope",
        "FFT",
        "PCB layout",
        "Bench validation",
      ],
    },
  },

  projects: [
    {
      id:
        "fsk-modem",

      category:
        "digital",

      featured:
        true,

      title:
        "Real-Time 4-FSK Audio Modem",

      subtitle:
        "DE1-SoC / Nios V",

      image:
        "assets/images/modem.svg",

      imageAlt:
        "Stylized audio spectrum and digital waveform visualization",

      summary:
        "A complete real-time modem that transmits and receives frequency-mapped digital symbols through the DE1-SoC audio path.",

      description:
        "The system interfaces with memory-mapped audio FIFOs, generates four transmit tones, and demodulates received symbols using a Goertzel detector. Framing logic adds synchronization, payload length, parity, and error-rate measurement, while VGA output makes the modem state visible during bring-up.",

      tags: [
        "Nios V",
        "C",
        "DSP",
        "Goertzel",
        "Audio FIFO",
        "VGA",
      ],

      highlights: [
        "Implemented a Goertzel-based detector for 100, 500, 1000, and 1500 Hz symbols at an 8 kHz sample rate.",

        "Added preamble synchronization, payload framing, parity checking, and BER/SER calculation.",

        "Integrated memory-mapped audio, keys, timer interrupts, and VGA visualization on the DE1-SoC.",
      ],

      metrics: [
        {
          label: "Modulation",
          value: "4-FSK",
        },

        {
          label: "Sample rate",
          value: "8 kHz",
        },

        {
          label: "Detector",
          value: "Goertzel",
        },
      ],

      links: {
        github: "",
        demo: "",
      },
    },

    {
      id:
        "minitpu",

      category:
        "digital",

      featured:
        true,

      title:
        "MiniTPU Systolic Matrix Accelerator",

      subtitle:
        "4×4 MAC Array",

      image:
        "assets/images/minitpu.svg",

      imageAlt:
        "Stylized 4 by 4 systolic processing element array",

      summary:
        "A streaming matrix-multiply engine built around a registered 4×4 systolic array and diagonal wavefront scheduling.",

      description:
        "The accelerator streams A operands from the left and B operands from the top, accumulating partial sums through pipelined processing elements. Control logic handles input staging, valid propagation, drain timing, and output delivery, with verification covering randomized transactions and cycle-accurate scoreboarding.",

      tags: [
        "SystemVerilog",
        "Systolic array",
        "Pipelining",
        "cocotb",
        "SVA",
      ],

      highlights: [
        "Designed the PE datapath, wavefront schedule, input buffering, and valid/shift control.",

        "Reached one 4×4 output tile every 16 cycles in steady state.",

        "Verified using cocotb, assertions, randomized tests, scoreboards, and waveform debug.",
      ],

      metrics: [
        {
          label: "Array",
          value: "4×4",
        },

        {
          label: "Throughput",
          value: "1 tile / 16 cycles",
        },

        {
          label: "Verification",
          value: "cocotb + SVA",
        },
      ],

      links: {
        github: "",
        demo: "",
      },
    },

    {
      id:
        "sensor-vga",

      category:
        "digital",

      featured:
        false,

      title:
        "Sensor-to-VGA + Audio RTL System",

      subtitle:
        "DE1-SoC FPGA",

      image:
        "assets/images/sensor-vga.svg",

      imageAlt:
        "Stylized FPGA sensor input connected to VGA pixels and audio",

      summary:
        "An FPGA system that converts live GPIO sensor events into visual and audio feedback with deterministic RTL control.",

      description:
        "The design combines sampled sensor inputs, threshold detection, debounce/edge logic, VGA timing generation, RGB pixel mixing, and audio feedback. It was developed as a full hardware path rather than a software-rendered application, making timing and state behavior explicit and verifiable.",

      tags: [
        "RTL",
        "FSM",
        "VGA",
        "GPIO",
        "Debounce",
        "Quartus",
      ],

      highlights: [
        "Implemented VGA HS/VS timing and real-time RGB pixel generation.",

        "Built FSM/datapath control, counters, edge detection, and debouncing logic.",

        "Validated with self-checking testbenches, SVA, timing analysis, and board bring-up.",
      ],

      metrics: [
        {
          label: "Outputs",
          value: "VGA + audio",
        },

        {
          label: "Control",
          value: "FSM/datapath",
        },

        {
          label: "Validation",
          value: "Simulation + board",
        },
      ],

      links: {
        github: "",
        demo: "",
      },
    },

    {
      id:
        "uart-i2c",

      category:
        "digital",

      featured:
        true,

      title:
        "UART-to-I²C FPGA Bridge",

      subtitle:
        "Arty A7",

      image:
        "assets/images/uart-i2c.svg",

      imageAlt:
        "UART packets translated into I2C transactions inside an FPGA",

      summary:
        "A hardware bridge that receives framed UART commands and translates them into I²C bus transactions for peripheral control.",

      description:
        "The project joins serial reception, command framing, transaction control, and open-drain I²C behavior in one FPGA design. It is being used to explore protocol timing, byte sequencing, acknowledgements, and practical hardware/software integration on the Arty A7.",

      tags: [
        "SystemVerilog",
        "UART",
        "I²C",
        "Arty A7",
        "Vivado",
        "Testbench",
      ],

      highlights: [
        "Built modular UART RX, bridge control, and I²C master blocks.",

        "Handled framed commands, transfer length, acknowledgements, and completion status.",

        "Developed self-checking simulation infrastructure before board-level testing.",
      ],

      metrics: [
        {
          label: "Input",
          value: "UART",
        },

        {
          label: "Output",
          value: "I²C",
        },

        {
          label: "Platform",
          value: "Arty A7",
        },
      ],

      links: {
        github: "",
        demo: "",
      },
    },

    {
      id:
        "adcs-firmware",

      category:
        "firmware",

      featured:
        true,

      title:
        "ADCS Command + Communication Firmware",

      subtitle:
        "University of Toronto Aerospace Team",

      image:
        "assets/images/adcs.svg",

      imageAlt:
        "Satellite attitude-control firmware command flow",

      summary:
        "C firmware for command parsing, validation, checksums, and low-level communication within a student satellite ADCS subsystem.",

      description:
        "This work focuses on dependable command handling at the subsystem boundary. The implementation validates message structure, checks expected receive sizes, generates and verifies checksums, and supports bring-up by tracing failures across protocol framing and hardware communication behavior.",

      tags: [
        "C",
        "Firmware",
        "Checksums",
        "Command parser",
        "Bring-up",
        "ADCS",
      ],

      highlights: [
        "Implemented command parsing and checksum generation/verification in C.",

        "Debugged protocol framing, expected receive sizes, and record ordering.",

        "Supported subsystem bring-up by isolating hardware/software communication faults.",
      ],

      metrics: [
        {
          label: "Domain",
          value: "Space systems",
        },

        {
          label: "Language",
          value: "C",
        },

        {
          label: "Focus",
          value: "Reliable comms",
        },
      ],

      links: {
        github: "",
        demo: "",
      },
    },

    {
      id:
        "class-e-pa",

      category:
        "analog",

      featured:
        true,

      title:
        "14 MHz Class-E RF Power Amplifier",

      subtitle:
        "Complete PA Signal Chain",

      image:
        "assets/images/rf-pa.svg",

      imageAlt:
        "Stylized Class-E power amplifier waveform and matching network",

      summary:
        "A measured 14 MHz RF power amplifier chain covering logic conditioning, gate drive, switching PA, matching, and harmonic filtering.",

      description:
        "The amplifier was designed as a complete signal chain for a 50 Ω load. Work included comparator and gate-driver selection, Class-E switching behavior, realizable matching/filter networks, parasitic-aware simulation, bench tuning, and waveform validation for power, efficiency, distortion, and device stress.",

      tags: [
        "Class-E",
        "14 MHz",
        "LTspice",
        "RF matching",
        "ZVS",
        "Bench test",
      ],

      highlights: [
        "Designed comparator, gate driver, MOSFET stage, L-match, and low-pass filter.",

        "Considered passive Q, SRF, ESR, current rating, and layout parasitics.",

        "Validated gate/drain waveforms, ZVS timing, power, efficiency, and harmonics on the bench.",
      ],

      metrics: [
        {
          label: "Output",
          value: "4 W",
        },

        {
          label: "Efficiency",
          value: "75%",
        },

        {
          label: "THD",
          value: "1.3%",
        },
      ],

      viewer3d: {
        enabled: false,

        type:
          "iframe",

        src: "",

        title:
          "Interactive Altium 365 view of the Class-E amplifier PCB",

        caption:
          "Interactive Altium 365 PCB view — rotate, inspect layers, and explore the board in 3D.",
      },

      links: {
        github: "",
        demo: "",
      },
    },

    {
      id:
        "buck-boost",

      category:
        "analog",

      featured:
        true,

      title:
        "24 V Synchronous Buck-Boost Converter",

      subtitle:
        "Rover Power Regulation",

      image:
        "assets/images/buck-boost.svg",

      imageAlt:
        "Stylized four-switch buck-boost power converter",

      summary:
        "A four-switch non-inverting synchronous buck-boost regulator designed for stable 24 V rover power across a varying battery input.",

      description:
        "The design addresses component sizing, conduction and switching losses, operating-mode transitions, thermal performance, control-loop considerations, and PCB current paths. LTspice simulation and KiCad layout are used together so electrical choices remain grounded in physical implementation.",

      tags: [
        "Buck-boost",
        "500 kHz",
        "LTspice",
        "KiCad",
        "MOSFET selection",
        "PCB",
      ],

      highlights: [
        "Designed for 18–25.6 V input and regulated 24 V output.",

        "Evaluated inductor, capacitor, MOSFET RDS(on), gate charge, and switching tradeoffs.",

        "Laid out high-current paths with attention to switch-node area and high-di/dt loops.",
      ],

      metrics: [
        {
          label: "Input",
          value: "18–25.6 V",
        },

        {
          label: "Output",
          value: "24 V",
        },

        {
          label: "Switching",
          value: "500 kHz",
        },
      ],

      viewer3d: {
        enabled: false,

        type:
          "model",

        src:
          "assets/models/buck-boost.glb",

        poster:
          "assets/images/buck-boost.svg",

        alt:
          "Interactive 3D model of the buck-boost converter PCB",

        title:
          "Interactive KiCad PCB model",

        caption:
          "Drag to rotate, scroll to zoom, and inspect the PCB from any angle.",

        autoRotate:
          true,
      },

      links: {
        github: "",
        demo: "",
      },
    },
  ],
};
