---
title: 'Robotic Design: Titan Rover J3 Wrist (Pitch & Roll)'
description: >-
  Developed the J3 wrist to provide pitch and continuous roll for multi-axis
  manipulation (e.g., keyboards and joysticks). Integrated a 12-wire, 2A slip
  ring for infinite rotation, supported rotation with thrust bearings, and drove
  the joint with a NEMA 11 + 14:1 gearbox, iterating custom parts using both SLA
  (Form 2) and FDM (Ender 3 S1 Pro) printing.
date: '2026-01-29'
tags:
  - Robotics
  - Manufacturing
  - Mechanical Design
skills:
  - SLA 3D Printing with Engineering Strength Material
  - Electrical Routing
  - Motor Selection
paper: ''
videoId: ''
mainImage: /uploads/titan-rover-wrist/1769667835982-Screenshot2026-01-28222345.png
gallery:
  - /uploads/titan-rover-wrist/1769667910553-Screenshot2026-01-28222417.png
  - /uploads/titan-rover-wrist/1769667910571-Screenshot2026-01-28222423.png
  - /uploads/titan-rover-wrist/1769667910587-Screenshot2026-01-28222437.png
  - /uploads/titan-rover-wrist/1769667910603-Screenshot2026-01-28222447.png
  - /uploads/titan-rover-wrist/1769667910621-Screenshot2026-01-28222455.png
---
# Robotic Design: Titan Rover J3 Wrist (Pitch & Roll)

## Intro / Objective
The primary objective of this project was to design and implement the J3 wrist subsystem for the Titan Rover manipulator:
* **Enhanced Dexterity:** Designed to provide pitch and roll at the gripper, enabling multi-axis manipulation.
* **Complex Task Support:** Enabled the rover to operate keyboards, joysticks, and other interfaces requiring rotation in multiple planes.

---

## Methods / Approach
The wrist architecture was engineered to balance high range of motion with complex electrical routing:

* **Motion Capabilities:**
    * **Pitch:** Provides up/down articulation for the end-effector.
    * **Roll:** Features infinite rotation for continuous spinning without the risk of cable fatigue.
* **Component Integration:**
    * **Slip Ring:** Integrated a 12-wire, 2A slip ring at the roll joint to support continuous rotation and simplify wiring.
    * **Orbital Gearing:** Designed a custom ring gear assembly to rotate efficiently around the slip ring housing.
* **Manufacturing:**
    * Utilized **SLA (Formlabs Form 2)** for high-precision resin parts.
    * Utilized **FDM (Ender 3 S1 Pro)** for structural components.

---

## Technical Research
The design process focused on solving the mechanical and electrical constraints of a rotating joint:



* **Infinite Rotation Strategy:**
    * Used the slip ring to maintain electrical continuity, preventing wire twist during 360-degree maneuvers.
* **Mechanical Load Support:**
    * Integrated **thrust bearings** sandwiched against the main frame to carry axial loads and ensure smooth rotation under stress.
* **Actuation & Packaging:**
    * Selected a **NEMA 11 motor** paired with a **14:1 gearbox** to increase torque and fine-tune controllability.
    * Offset the motor from the slip ring to optimize mechanical clearance and assembly access.
* **Design Iteration:**
    * Developed a custom gear and bearing stack-up specifically tailored to the slip ring dimensions and printability constraints.

---

## Results and Impact

### Performance Metrics
* **Functional Expansion:** Successfully delivered a pitch + continuous roll subsystem, significantly expanding the rover’s ability to interact with complex environments.
* **System Reliability:** * **Wiring Safety:** Eliminated wire entanglement issues via the integrated slip ring.
    * **Smooth Operation:** Thrust bearings provided stable rotation even when the manipulator was fully extended.
    * **Rapid Prototyping:** Used 3D printing to iterate quickly on the fit and function of custom gear interfaces.

### Core Competencies Demonstrated
* **Advanced Fabrication:** Hybrid manufacturing using both SLA and FDM 3D printing.
* **Electromechanical Integration:** Routing power and signals through rotating joints using slip rings.
* **Power Transmission:** Motor and gearbox selection (NEMA 11 + 14:1) for precision robotic joints.

---

## Final Takeaway
The J3 wrist provides a sophisticated solution for robotic dexterity, combining continuous electrical paths with robust mechanical support to handle real-world interaction tasks.
