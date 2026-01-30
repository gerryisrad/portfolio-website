---
title: Source Panel Method for NACA Airfoils
description: >-
  Built a MATLAB implementation of the 2D source panel method to analyze airfoil
  aerodynamics and compute surface pressure coefficient (Cp) distributions.
  Generated NACA 2412 and NACA 0024 geometries using the NACA 4‑digit equations,
  discretized each airfoil into panels, solved for source strengths via a linear
  system, and plotted Cp to compare cambered vs. symmetric lift behavior. This
  project demonstrates fast, physics-based aerodynamic evaluation without
  requiring wind tunnel testing.
date: '2026-01-29'
tags:
  - Programming
  - Aerodynamics
  - Airfoils
skills:
  - Application of Bernoulli's Equation for Aerodynamic Calculations
  - MATLAB Programming for Source Panel Method
  - Data Visualization of Aerodynamic Pressure Profiles
paper: >-
  /uploads/source-panel-method-for-naca-airfoils/1769666164247-Project2AirFoil.pdf
videoId: ''
mainImage: >-
  /uploads/source-panel-method-for-naca-airfoils/1769666604210-Screenshot2026-01-28220304.png
gallery: []
---
# Aerodynamic Analysis: Source Panel Method for NACA Airfoils

## Intro / Objective
The primary objective of this project is to simulate and compare the aerodynamic performance of different airfoil geometries:
* **NACA 2412 Analysis:** Apply the source panel method to a cambered airfoil to compute the pressure coefficient (Cp) distribution across its surface.
* **Comparative Study:** Replicate the workflow on a symmetric NACA 0024 airfoil to evaluate how geometry (cambered vs. symmetric) influences lift-producing behavior.

---

## Methods / Approach
The simulation was conducted using a custom MATLAB implementation of the source panel method:

* **Geometry Generation:**
    * Coordinates were generated using standard NACA 4-digit equations.
    * The surface was discretized into straight-line panels, with control/collocation points established at each panel center.
* **Mathematical Formulation:**
    * Computed unit normal (n) and tangent (t) vectors for each panel.
    * Applied free-stream conditions (V_inf) and angle of attack (alpha), enforcing the **no-penetration condition** (normal velocity = 0).
    * Constructed influence coefficient matrices to model panel-to-panel interactions.
* **System Solution:**
    * Solved the resulting linear system to find unknown source strengths for every panel.
    * Computed surface tangential velocity (Vi) at control points.
    * Applied Bernoulli’s equation to determine the pressure coefficient: **Cp = 1 - (Vi / V_inf)^2**.

---

## Technical Research
The research focused on translating theoretical fluid dynamics into a stable numerical solver:



* **Core Components in MATLAB:**
    * Definition of panel geometry (endpoints, lengths, and midpoints).
    * Calculation of influence coefficients (Nij and Tij) for induced velocities.
    * Special handling of **self-influence cases (i=j)** to maintain numerical stability.
* **Aerodynamic Parameters:**
    * Standardized the model using non-dimensional quantities: Camber (M), Camber location (P), Thickness (XX), Chord (C), and Alpha.
* **Capability Validation:**
    * Demonstrated that surface pressure distributions can be approximated using only geometry and free-stream inputs via panel interactions.

---

## Results and Impact

### Airfoil Comparison

* **NACA 2412 (Cambered):**
    * **Asymmetry:** The geometry exhibits a clear camber line, allowing for lift generation even at alpha = 0.
    * **Cp Distribution:** The plot shows two distinct curves. Reduced pressure on the upper surface (from 0.15 to 0.75 chord) creates the differential required for lift.
* **NACA 0024 (Symmetric):**
    * **Symmetry:** Top and bottom pressure distributions match exactly, resulting in a single Cp curve and zero lift under the modeled conditions.

### Practical Impact
* **Efficiency:** This method provides a fast, low-cost alternative to physical wind tunnel experiments for initial aerodynamic insights.
* **Scalability Note:** While effective, the computational complexity of influence coefficient calculations increases significantly as the number of panels (N) grows large.

---

## Final Takeaway
By comparing the NACA 2412 and 0024, this project successfully demonstrates how subtle geometric changes in camber directly translate to pressure differentials and lift generation in a simulated environment.
