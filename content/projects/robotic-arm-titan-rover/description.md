# Robotic Design: Titan Rover High-Force Gripper Subsystem

## Intro / Objective
The primary objective of this project was to engineer a robust gripper capable of meeting the rigorous demands of the Titan Rover:
* **Performance Requirement:** Designed to generate high tip force specifically to lift objects weighing up to 10 lbs from the floor.
* **Design Philosophy:** Prioritized high mechanical advantage, structural robustness, and reliable operation under heavy loads.

---

## Methods / Approach
To achieve the necessary lifting capacity, the design utilized a multi-stage power transmission and advanced manufacturing:

* **Geared Actuation Stack:**
    * Developed a high-torque sequence: NEMA 11 motor -> 5:1 gearbox -> 35:1 worm-drive reduction.
    * This architecture allows each side of the gripper to apply high force while maintaining a compact, durable package.
* **Manufacturing & Fabrication:**
    * Utilized SLA 3D printing for the fabrication of key components to ensure accurate geometry and structural integrity.

---

## Technical Research
The design process involved rigorous material selection and structural validation to ensure the system could handle peak loads:



* **Force & Torque Strategy:**
    * Targeted a maximum tip force of ~42 lb per side through multi-stage reduction.
* **Material Science:**
    * Selected **Formlabs Rigid 4000** for the links and housing to provide superior stiffness compared to standard resins.
    * Paired **nylon gears with a brass worm** to minimize friction and allow for dry (unlubricated) operation.
* **Simulation & Analysis:**
    * Performed **ANSYS stress analysis** to verify structural integrity and identify potential failure points before physical production.

---

## Results and Impact

### Performance Metrics
* **Force Output:** Successfully produced ~42 lb of force per end, significantly exceeding the 10 lb minimum requirement.
* **Reliability Gains:** * High-reduction gearing provided consistent, repeatable force output.
    * Optimized material selection reduced the risk of part deformation under load.
    * Low-friction pairings reduced long-term maintenance needs.

### Core Competencies Demonstrated
* **Advanced Manufacturing:** SLA 3D printing with engineering-grade materials.
* **Mechanical Design:** Integration of worm-drive systems and high-reduction gearing.
* **Computational Validation:** Professional-grade stress analysis and design iteration using ANSYS.

---

## Final Takeaway
This subsystem demonstrates a successful balance between compact robotic packaging and high-output mechanical performance, ensuring the Titan Rover can reliably interact with heavy payloads in the field.