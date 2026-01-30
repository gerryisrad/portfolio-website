# FEM Analysis: 2D Steady-State Heat Conduction

## Intro / Objective
The primary goal of this project is to develop a comprehensive understanding of **steady-state 2D heat conduction** on arbitrary finite-element meshes. The objectives include:
* Solving for temperature distributions under applied heat loads, generation, and initial conditions.
* Implementing a complete workflow in **MATLAB** using core Finite Element Method (FEM) equations.
* Visualizing the resulting thermal fields graphically to interpret physical behavior.

---

## Methods / Approach
To simulate the thermal physics, we utilized an **isoparametric FEM formulation**:

* **Discretization:** The domain is broken down into **3-node triangular elements** utilizing linear shape functions.
* **Mesh Generation:** Utilized the MATLAB PDE toolbox to handle complex or arbitrary geometries.
* **Numerical Integration:** Element matrices and load vectors are computed via **Gauss quadrature**.
* **System Assembly:** Individual element contributions are assembled into a global linear system (KU = F) to solve for nodal temperatures.
* **Boundary Conditions:**
    * **Dirichlet (Essential):** Fixed temperatures applied to specific outer edges.
    * **Neumann (Natural):** Applied heat flux on selected edges calculated via 1D edge integrals.

---

## Technical Research
The implementation relies on the mapping between reference (parametric) coordinates and physical coordinates.


### Key Mathematical Formulations
* **Isoparametric Mapping:** Derivation of the **Jacobian matrix (J)** and its inverse to transform derivatives from the reference element to the physical element.
* **Element Stiffness Matrix (Kelem):** Formed using the gradient matrix B (representing shape function derivatives) and integrated over the element area:
  **Kelem = sum( B^T * k * B * det(J) * w )**
* **Source & Flux Terms:** Consistent implementation of heat generation (internal source) and surface flux within the **FEM weak form** to ensure energy conservation.
* **Verification:** Systematic error comparison against analytical or reference solutions to isolate bugs in the assembly pipeline.

---

## Results and Impact

### Performance Benchmarks

| Case | Result | Observation |
| :--- | :--- | :--- |
| **Dirichlet-only** | Error ~ 10^-11 | Validates the core assembly and solver logic. |
| **Heat Generation** | Error ~ 11.27 | Shape is correct, but indicates sensitivity in source-term accumulation. |
| **Neumann (Flux)** | Error ~ 11.27 | Trend aligns with reference; error likely tied to source-term handling. |

### Mesh Refinement Study

* The density of the mesh (measured at 1.0, 0.1, and 0.01) significantly impacted the solution:
    * **Coarse (1.0):** Fast runtime but lacked necessary spatial detail; "blocky" results.
    * **Fine (0.01):** High visual smoothness, but resulted in a significant computational "tax" on runtime.
    * **Optimal (0.1):** Identified as the **"Goldilocks" zone**, providing a high-quality accuracy-to-cost tradeoff.

### Final Takeaway
This project demonstrates a functional FEM capability for solving real-world heat transfer problems. It highlights how boundary conditions and internal generation represent physical thermal loads, providing a foundation for more complex multiphysics simulations.