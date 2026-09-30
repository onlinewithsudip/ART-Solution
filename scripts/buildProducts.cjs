const fs = require('fs');

const rawItems = [
  // Page 1
  { desc: "IUI Media Set Glass Vial (5 ml HTF + 1 ml Upper Layer + 1 ml Lower Layer)", make: "Hitech", pack: "5 ml HTF + 1 ml Upper Layer + 1 ml Lower Layer", rate: 550, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "IUI Media Set (5 ml HTF + 1 ml Upper Layer + 1 ml Lower Layer) ( USFDA Approved )", make: "Fertipro", pack: "5 ml HTF + 1 ml Upper Layer + 1 ml Lower Layer", rate: 1000, cat: "IUI & IVF Media", imgType: "media", isFeatured: true },
  { desc: "DG Media Set Glass Vial ( 1 ml upper layer + 1 ml lower layer)", make: "Hitech", pack: "1 ml upper layer + 1 ml lower layer", rate: 400, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "IUI Media Set Plastic Vial (5 ml HTF + 1 ml Upper Layer + 1 ml Lower Layer)", make: "Hitech", pack: "5 ml HTF + 1 ml Upper Layer + 1 ml Lower Layer", rate: 600, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "DG Media Set Plastic Vial ( 1 ml upper layer + 1 ml lower layer)", make: "Hitech", pack: "1 ml upper layer + 1 ml lower layer", rate: 450, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "DG Media Set ( 1 ml upper layer + 1 ml lower layer)", make: "Fertipro", pack: "1 ml upper layer + 1 ml lower layer", rate: 650, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Fertipro Sil Select Plus", make: "Fertipro", pack: "8 bottles of 5 ml sperm wash + 8 bottles of 2.5 ml upper layer + 8 bottles of 2.5 ml lower layer", rate: 9500, cat: "Oils & Density Gradients", imgType: "media", isFeatured: true },
  { desc: "Stickey Mat", make: "Indian Made", pack: "30", rate: 750, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Sperm Wash", make: "Origio", pack: "60 ml", rate: 6100, cat: "IUI & IVF Media", imgType: "media", isFeatured: true },
  { desc: "Origio Flushing Media with HSA", make: "Origio", pack: "125 ml", rate: 7000, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Sage 1 step", make: "Origio", pack: "10 ml", rate: 3600, cat: "IUI & IVF Media", imgType: "media", isFeatured: true },
  { desc: "Oil for tissue culture", make: "Origio", pack: "100 ml", rate: 4500, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Sperm Freez", make: "Origio", pack: "12 ml", rate: 3000, cat: "Cryopreservation & Vitrification", imgType: "cryo" },
  { desc: "Stripper tips 135 um", make: "Origio", pack: "20", rate: 6000, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "Stripper tips 150 um", make: "Origio", pack: "20", rate: 6000, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "Stripper tips 175 um", make: "Origio", pack: "20", rate: 6000, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "Stripper tips 275 um", make: "Origio", pack: "20", rate: 6000, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "PvP 7%", make: "Origio", pack: "0.5 ml", rate: 2100, cat: "Enzymes & Preparation Kits", imgType: "media" },
  { desc: "Hydase 80 IU", make: "Origio", pack: "1 ml", rate: 2100, cat: "Enzymes & Preparation Kits", imgType: "media" },

  // Page 2
  { desc: "Vitrifit", make: "Origio", pack: "Single Sterile", rate: 1200, cat: "Cryopreservation & Vitrification", imgType: "cryo" },
  { desc: "Cryomatrix", make: "Cryomatrix", pack: "Pack of 10 pics/Rate of single pics", rate: 950, cat: "Cryopreservation & Vitrification", imgType: "cryo" },
  { desc: "Humidification Bottle Old for BT 37 planner", make: "Origio", pack: "Single Sterile", rate: 8500, cat: "Laboratory Equipment & Accessories", imgType: "labware" },
  { desc: "Humidification Bottle New for BT 37 MK II", make: "Origio", pack: "Single Sterile", rate: 8500, cat: "Laboratory Equipment & Accessories", imgType: "labware" },
  { desc: "Wallace ONS 1733 Single Lumen", make: "Wallace", pack: "Single Sterile", rate: 1850, cat: "Needles, Catheters & Cannulas", imgType: "catheter", isFeatured: true },
  { desc: "Wallace DNS 1733 Double Lumen", make: "Wallace", pack: "Single Sterile", rate: 4200, cat: "Needles, Catheters & Cannulas", imgType: "catheter" },
  { desc: "Wallace PEB 623", make: "Wallace", pack: "Single Sterile", rate: 2200, cat: "Needles, Catheters & Cannulas", imgType: "catheter" },
  { desc: "Wallace PES 623", make: "Wallace", pack: "Single Sterile", rate: 2300, cat: "Needles, Catheters & Cannulas", imgType: "catheter" },
  { desc: "Wallace CE 123", make: "Wallace", pack: "Single Sterile", rate: 1850, cat: "Needles, Catheters & Cannulas", imgType: "catheter" },
  { desc: "Wallace CE 18", make: "Wallace", pack: "Single Sterile", rate: 1850, cat: "Needles, Catheters & Cannulas", imgType: "catheter" },
  { desc: "Wallace 1816N", make: "Wallace", pack: "Single Sterile", rate: 1850, cat: "Needles, Catheters & Cannulas", imgType: "catheter" },
  { desc: "Allwin OPU Single lumen", make: "Allwin Medical", pack: "Single Sterile", rate: 1400, cat: "Needles, Catheters & Cannulas", imgType: "catheter" },
  { desc: "Allwin BT ETC UP", make: "Allwin Medical", pack: "Single Sterile", rate: 1400, cat: "Needles, Catheters & Cannulas", imgType: "catheter" },
  { desc: "Allwin BT ETC USP", make: "Allwin Medical", pack: "Single Sterile", rate: 1500, cat: "Needles, Catheters & Cannulas", imgType: "catheter" },
  { desc: "IUI Cannula Sperm O Way Curved/Straight with syringe", make: "Sperm O Way", pack: "50", rate: 3250, cat: "Needles, Catheters & Cannulas", imgType: "catheter" },
  { desc: "Allwin IUI Cannula Curved/Straight without syringe", make: "Allwin Medical", pack: "25", rate: 1750, cat: "Needles, Catheters & Cannulas", imgType: "catheter" },
  { desc: "IUI Cannula Solution IVF Curved/Straight with syringe", make: "Solution IVF", pack: "50", rate: 3250, cat: "Needles, Catheters & Cannulas", imgType: "catheter" },
  { desc: "Gilson Tips 200 ul", make: "Gilson", pack: "Single Sterile", rate: 28, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "Gilson Tips 1000 ul", make: "Gilson", pack: "Single Sterile", rate: 31, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "Cansure laminar", make: "Candore", pack: "500", rate: 2100, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Cansure Floor", make: "Candore", pack: "500", rate: 2300, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Cryotech 101", make: "Cryotech", pack: "ES-1 ml + VS 1 ml + Cryotech-4 devices + Vitriplate-3 Plates", rate: 9500, cat: "Cryopreservation & Vitrification", imgType: "cryo", isFeatured: true },
  { desc: "Cryotech 102", make: "Cryotech", pack: "TS-1.8 ML + DS-0.5 ml + WS-1 ml + Warm Plate-1 Plate", rate: 6500, cat: "Cryopreservation & Vitrification", imgType: "cryo" },
  { desc: "Cryotech 110", make: "Cryotech", pack: "2*1.8 ml ES + 4*1.8 ml VS", rate: 22500, cat: "Cryopreservation & Vitrification", imgType: "cryo", isFeatured: true },
  { desc: "Cryotech 205", make: "Cryotech", pack: "5*1.8 ml TS + 1.8 ml DS + 2*1.8 ml WS", rate: 12500, cat: "Cryopreservation & Vitrification", imgType: "cryo" },
  { desc: "Reproplate", make: "Cryotech", pack: "10", rate: 8900, cat: "Cryopreservation & Vitrification", imgType: "cryo" },
  { desc: "Falcon ( TC Grade ) 5 ml RBT", make: "Falcon", pack: "Single Sterile", rate: 19, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Falcon ( TC Grade ) 14 ml RBT", make: "Falcon", pack: "Single Sterile", rate: 24, cat: "Disposables & Labware", imgType: "labware" },

  // Page 3
  { desc: "Falcon ( TC Grade ) 15 ml CBT", make: "Falcon", pack: "50 Pics/rate is of single pics", rate: 19, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Falcon ( TC Grade ) 60X15 mm Dish", make: "Falcon", pack: "20 Pics/rate is of single pics", rate: 35, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Falcon ( TC Grade ) 35X10 mm dish", make: "Falcon", pack: "20 Pics/rate is of single pics", rate: 34, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Falcon ICSI Dish ( TC Grade ) 50X9 mm", make: "Falcon", pack: "20 Pics/rate is of single pics", rate: 40, cat: "Disposables & Labware", imgType: "labware", isFeatured: true },
  { desc: "Falcon ( TC Grade ) 3 ml pipette", make: "Falcon", pack: "Single Sterile", rate: 40, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "Falcon ( TC Grade ) 100X20 mm dish", make: "Falcon", pack: "20 Pics/rate is of single pics", rate: 42, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Falcon ( TC Grade ) CWD", make: "Falcon", pack: "20 Pics/rate is of single pics", rate: 40, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Nunc 4 well Dish", make: "Thermo", pack: "4 Pics/rate is of single pics", rate: 105, cat: "Disposables & Labware", imgType: "labware", isFeatured: true },
  { desc: "Advy 5 ml RB Tube ( IVF Grade )", make: "Advy", pack: "Single Sterile", rate: 21, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Advy 14 ml RB Tube ( IVF Grade )", make: "Advy", pack: "Single Sterile", rate: 25, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Advy 15 ml CB Tube ( IVF Grade )", make: "Advy", pack: "Single Sterile", rate: 25, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Advy 57X16 mm Dish ( IVF Grade )", make: "Advy", pack: "Single Sterile", rate: 38, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Advy 35X10 mm Dish ( IVF Grade )", make: "Advy", pack: "Single Sterile", rate: 37, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Advy 90X20 mm Dish ( IVF Grade )", make: "Advy", pack: "Single Sterile", rate: 50, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Advy 4 well Dish ( IVF Grade )", make: "Advy", pack: "Single Sterile", rate: 110, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Advy 4 well Conical Dish ( IVF Grade )", make: "Advy", pack: "Single Sterile", rate: 150, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Advy ICSI Dish 50X9 mm ( IVF Grade )", make: "Advy", pack: "Single Sterile", rate: 45, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Advy 3 ml pipette ( IVF Grade )", make: "Advy", pack: "Single Sterile", rate: 40, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "Advy CWD ( IVF Grade )", make: "Advy", pack: "Single Sterile", rate: 41, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Advy Microfludics CA 0", make: "Advy", pack: "Single Sterile", rate: 4500, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Glass Pasteur Pipette with Cotton Plug 6\"", make: "Volac/Krishco", pack: "250/150 Pics, rate of single pics", rate: 70, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "Glass Pasteur Pipette with Cotton Plug 9\"", make: "Volac/Krishco", pack: "250/150 Pics, rate of single pics", rate: 70, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "Holding 35*", make: "Krishco", pack: "10 Pics/rate is of single pics", rate: 1100, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "Injecting 35*", make: "Krishco", pack: "10 Pics/rate is of single pics", rate: 1400, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "TPC Holding 35*", make: "TPC", pack: "10 Pics/rate is of single pics", rate: 1400, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "TPC Injecting 35*", make: "TPC", pack: "10 Pics/rate is of single pics", rate: 1800, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "Tissue Culture Water", make: "APS Labs", pack: "1000 ml", rate: 1500, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "BD Syringe", make: "BD", pack: "1", rate: 10, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Cane", make: "Indian Made", pack: "1", rate: 50, cat: "Cryopreservation & Vitrification", imgType: "cryo" },
  { desc: "Tarson 100 ml Container", make: "Tarson", pack: "284 Pics/Rate is of single pics if purchase loose", rate: 17, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Tarson 50 ml Container", make: "Tarson", pack: "384 Pics/Rate is of single pics if purchase loose", rate: 15, cat: "Disposables & Labware", imgType: "labware" },

  // Page 4
  { desc: "Tarson 15 ml Single Sterile CB Tube", make: "Tarson", pack: "Single Sterile/Rate is of single pics if purchase loose", rate: 15, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "Tarson 3 ml Single Sterile Pasteur Pipette", make: "Tarson", pack: "Single Sterile/Rate is of single pics if purchase loose", rate: 12, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "Goblet", make: "Indian Made", pack: "Box of 10 Pics/rate is of single pics", rate: 40, cat: "Cryopreservation & Vitrification", imgType: "cryo" },
  { desc: "Growth X PRP", make: "Krishco", pack: "Pack of 5 pics/Rate of single pics", rate: 1500, cat: "Enzymes & Preparation Kits", imgType: "media" },
  { desc: "Fertipro Aspiration Media without HSA", make: "Fertipro", pack: "100 ml", rate: 4500, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Fertipro Flushing Media with Ab & HSA", make: "Fertipro", pack: "100 ml", rate: 4500, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Fertipro Sil Select 100 % Stock Solution", make: "Fertipro", pack: "100 ml", rate: 18900, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Fertipro 45/90 Gradient", make: "Fertipro", pack: "2*20 ml", rate: 8500, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Fertipro 90 %", make: "Fertipro", pack: "20 ml", rate: 5460, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Fertipro 45/90 Gradient", make: "Fertipro", pack: "2*100 ml", rate: 26250, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Fertipro 90 %", make: "Fertipro", pack: "100 ml", rate: 15750, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Fertipro Sperm Freez", make: "Fertipro", pack: "20 ml", rate: 4000, cat: "Cryopreservation & Vitrification", imgType: "cryo" },
  { desc: "Fertipro hydase", make: "Fertipro", pack: "1 ml", rate: 1500, cat: "Enzymes & Preparation Kits", imgType: "media" },
  { desc: "Fertipro PvP 10 %", make: "Fertipro", pack: "0.5 ml", rate: 1500, cat: "Enzymes & Preparation Kits", imgType: "media" },
  { desc: "Fertipro Minarel oil light weight", make: "Fertipro", pack: "100 ml", rate: 4300, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Fertipro Minarel oil light weight", make: "Fertipro", pack: "50 ml", rate: 2900, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Fertipro High Viscocity Oil", make: "Fertipro", pack: "100 ml", rate: 4400, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Fertipro High Viscocity Oil", make: "Fertipro", pack: "50 ml", rate: 3100, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Fertipro Gain Media ( Single Step )", make: "Fertipro", pack: "10 ml", rate: 3500, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Fertipro Sper Magic", make: "Fertipro", pack: "0.5 ml", rate: 42000, cat: "Enzymes & Preparation Kits", imgType: "media" },
  { desc: "IVF Grade 4 ml round bottom tube", make: "IVF Gen", pack: "Single Sterile", rate: 20, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "IVF Grade 12 ml round bottem tube", make: "IVF Gen", pack: "Single Sterile", rate: 24, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "IVF Grade 15 ml conical bottom tube", make: "IVF Gen", pack: "Pack of 50 Pics/Rate of Single pics", rate: 24, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "IVF Grade 3 ml pastuer pipette", make: "IVF Gen", pack: "Single Sterile", rate: 35, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "IVF Grade 90x15 mm dish", make: "IVF Gen", pack: "Pack of 10 Pics/Rate of single pics", rate: 45, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "IVF Grade 55x15 mm dish", make: "IVF Gen", pack: "Pack of 10 Pics/Rate of single pics", rate: 35, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "IVF Grade 35x10 mm dish", make: "IVF Gen", pack: "Pack of 10 Pics/Rate of single pics", rate: 33, cat: "Disposables & Labware", imgType: "labware" },
  { desc: "IUI Disposable set", make: "Krishco", pack: "1 box", rate: 250, cat: "Disposables & Labware", imgType: "catheter" },
  { desc: "Gynotec Sperm Wash", make: "Gynotec", pack: "10 ml", rate: 1838, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Gynotec Sperm Wash", make: "Gynotec", pack: "50 ml", rate: 4725, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Gynotec Gradient 10 ml Set 45% & 80%", make: "Gynotec", pack: "10 ml *2", rate: 6825, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Gynotec Gradient 50 ml set 45% & 80%", make: "Gynotec", pack: "50 ml * 2", rate: 13125, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Gynotec Sperm Freez Media", make: "Gynotec", pack: "10 ml *2", rate: 6825, cat: "Cryopreservation & Vitrification", imgType: "cryo" },

  // Page 5
  { desc: "Gynotec Flushing Media With HSA", make: "Gynotec", pack: "30 ml", rate: 3675, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Gynotec Flushing Media With HSA", make: "Gynotec", pack: "60 ml", rate: 4725, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Gynotec Flushing Media With HSA", make: "Gynotec", pack: "120 ml", rate: 7350, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Gynotec PvP", make: "Gynotec", pack: "0.2 ml", rate: 1890, cat: "Enzymes & Preparation Kits", imgType: "media" },
  { desc: "Gynotec Hydase", make: "Gynotec", pack: "1 ml", rate: 1890, cat: "Enzymes & Preparation Kits", imgType: "media" },
  { desc: "Gynotec Single Step", make: "Gynotec", pack: "20 ml", rate: 7560, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Gynotec Oil With 20 mm Opening", make: "Gynotec", pack: "50 ml", rate: 3885, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Gynotec Oil With 32 mm Opening", make: "Gynotec", pack: "100 ml", rate: 4935, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Gynotec Gradient 50 ml 100%", make: "Gynotec", pack: "50 ml", rate: 11550, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Gynotec Gradient 100 ml 100%", make: "Gynotec", pack: "100 ml", rate: 21000, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Register- IVF/ICSI Register", make: "ART Medical", pack: "1 Register of 50 Pages", rate: 600, cat: "Clinical Registers & Documentation", imgType: "register" },
  { desc: "Register- ART Register", make: "ART Medical", pack: "1 Register of 50 Pages", rate: 600, cat: "Clinical Registers & Documentation", imgType: "register" },
  { desc: "Register-ET Register", make: "ART Medical", pack: "1 Register of 50 Pages", rate: 600, cat: "Clinical Registers & Documentation", imgType: "register" },
  { desc: "Register- Vitrification & Thawing Register", make: "ART Medical", pack: "1 Register of 50 Pages", rate: 600, cat: "Clinical Registers & Documentation", imgType: "register" },
  { desc: "Set of 4 registers ( IVF/ICSI + ART + ET + Vitrification & Thawing )", make: "ART Medical", pack: "4 Registers of 50 pages each", rate: 2200, cat: "Clinical Registers & Documentation", imgType: "register", isFeatured: true },
  { desc: "RI EZ Tip 135 um", make: "RI", pack: "20", rate: 6000, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "RI EZ Tip 145 um", make: "RI", pack: "20", rate: 6000, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "RI EZ Tip 170 um", make: "RI", pack: "20", rate: 6000, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "RI EZ Tip 200 um", make: "RI", pack: "20", rate: 6000, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "RI EZ Tip 290 um", make: "RI", pack: "20", rate: 6000, cat: "Micropipettes & Stripper Tips", imgType: "tips" },
  { desc: "Global Total TM", make: "Life Global", pack: "30", rate: 11500, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Global Total Flushing Media With HEPES & HSA", make: "Life Global", pack: "50", rate: 7000, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "LG Parafin Oil", make: "LG Lifesciences", pack: "100", rate: 6000, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Haloview sperm DNA fragmentation kit", make: "Haloview", pack: "12 Test", rate: 23000, cat: "Enzymes & Preparation Kits", imgType: "media" },
  { desc: "7X Cleaning Solution", make: "Shivani Scientific", pack: "3.8 Litre", rate: 8000, cat: "Laboratory Equipment & Accessories", imgType: "labware" },
  { desc: "Profert Flushing Media with HEPES and HSA", make: "Profert", pack: "100", rate: 6000, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Surelife Single step", make: "Surelife", pack: "20", rate: 6800, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Surelife Sperm Wash Media", make: "Surelife", pack: "60", rate: 4000, cat: "IUI & IVF Media", imgType: "media" },
  { desc: "Surelife Sperm Gradient Media Set", make: "Surelife", pack: "2x 10", rate: 6000, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Surelife Sperm Freezing Media", make: "Surelife", pack: "20", rate: 4000, cat: "Cryopreservation & Vitrification", imgType: "cryo" },
  { desc: "Invitrcare Flushing Media with HEPES", make: "Invitrocare", pack: "100", rate: 4500, cat: "IUI & IVF Media", imgType: "media" },

  // Page 6
  { desc: "Invitrocare Oil", make: "Invitrocare", pack: "100", rate: 4500, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Surelife PVP 7 %", make: "Surelife", pack: "5x 0.2", rate: 6500, cat: "Enzymes & Preparation Kits", imgType: "media" },
  { desc: "Surelife Hydase", make: "Surelife", pack: "5x 1", rate: 7500, cat: "Enzymes & Preparation Kits", imgType: "media" },
  { desc: "Invitrocare Oil", make: "Invitrocare", pack: "500", rate: 12500, cat: "Oils & Density Gradients", imgType: "media" },
  { desc: "Nidacon Oil", make: "Nidacon", pack: "100", rate: 4200, cat: "Oils & Density Gradients", imgType: "media" }
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const lines = [];
lines.push(`// Generated ART Solution authentic clinical products portfolio & equipment`);
lines.push(`import { Product } from '../types';`);
lines.push(`import mediaVialsImg from '../assets/images/art_media_vials_1790759397048.jpg';`);
lines.push(`import catheterImg from '../assets/images/art_catheters_cannula_1790759417050.jpg';`);
lines.push(`import labwareImg from '../assets/images/art_petri_labware_1790759431806.jpg';`);
lines.push(`import cryoImg from '../assets/images/art_cryo_devices_1790759458406.jpg';`);
lines.push(`import registerImg from '../assets/images/art_clinic_registers_1790759495328.jpg';`);
lines.push(`import workstationImg from '../assets/images/product_ivf_workstation_1790663839811.jpg';`);
lines.push(`import incubatorImg from '../assets/images/product_benchtop_incubator_1790663852918.jpg';`);
lines.push(`import micromanipulatorImg from '../assets/images/product_micromanipulator_1790663865258.jpg';`);
lines.push(`import cleanroomImg from '../assets/images/gallery_cleanroom_setup_1790663877901.jpg';`);
lines.push(``);
lines.push(`export const DEFAULT_EQUIPMENT_CATEGORIES: string[] = [`);
lines.push(`  'IUI & IVF Media',`);
lines.push(`  'Needles, Catheters & Cannulas',`);
lines.push(`  'Oils & Density Gradients',`);
lines.push(`  'Cryopreservation & Vitrification',`);
lines.push(`  'Micropipettes & Stripper Tips',`);
lines.push(`  'Disposables & Labware',`);
lines.push(`  'Enzymes & Preparation Kits',`);
lines.push(`  'Clinical Registers & Documentation',`);
lines.push(`  'Laboratory Equipment & Accessories',`);
lines.push(`  'IVF Workstations',`);
lines.push(`  'Incubators & Warming',`);
lines.push(`  'Micromanipulation & Laser',`);
lines.push(`  'Turnkey Lab Setup'`);
lines.push(`];`);
lines.push(``);
lines.push(`export const artProducts: Product[] = [`);

// Add the 4 primary flagship equipment items first (updated to ₹ prices)
lines.push(`  {
    id: 'prod-ivf-workstation-aura',
    name: 'AuraFlow Prime Laminar IVF Workstation',
    category: 'IVF Workstations',
    modelNumber: 'AF-2000-DUO',
    makeImporter: 'ART Solution Engineering',
    packSize: '1 Complete Workstation Unit',
    rate: 1250000,
    shortDesc: 'Dual-operator Class II laminar flow workstation with integrated heated glass stages and stereomicroscope ports.',
    fullDesc: 'The AuraFlow Prime Workstation provides an ultra-clean ISO Class 5 laminar air environment explicitly calibrated for oocyte retrieval, denudation, and embryo handling. Features dual independent thermal zones (PID controlled to ±0.1°C), vibration-isolated microscope platforms, and dimmable halogen-free LED illumination.',
    price: '₹12,50,000 – ₹18,20,000',
    priceType: 'range',
    inStock: true,
    isFeatured: true,
    image: workstationImg,
    features: [
      'ISO 14644-1 Class 5 laminar vertical airflow',
      'Dual independent PID stage heating to ±0.1°C accuracy',
      'Integral vibration-dampened microscope plinth',
      'High-efficiency VOC and HEPA H14 filtration system'
    ],
    specs: [
      { key: 'Make / Importer', value: 'ART Solution' },
      { key: 'Work Surface', value: 'Medical-grade 316 Stainless Steel with heated glass zones' },
      { key: 'Thermal Regulation', value: 'Microprocessor PID (37.0°C ± 0.1°C)' },
      { key: 'Airflow Velocity', value: '0.35 m/s ± 0.05 m/s uniform laminar stream' },
      { key: 'Filtration Efficiency', value: '99.999% at 0.3 micron with active carbon VOC pre-filter' },
      { key: 'FY 25-26 Cust Supply Rate', value: '₹12,50,000 onwards' }
    ]
  },
  {
    id: 'prod-benchtop-incubator-omni',
    name: 'OmniCell 6X Benchtop Tri-Gas Incubator',
    category: 'Incubators & Warming',
    modelNumber: 'OC-6X-TRIGAS',
    makeImporter: 'ART Solution Engineering',
    packSize: '1 Complete Benchtop System',
    rate: 850000,
    shortDesc: '6-chamber benchtop incubator with individualized heated lid zones and ultra-rapid gas recovery for embryo culturing.',
    fullDesc: 'Designed to eliminate cross-contamination and thermal fluctuation, each of the 6 independent incubation wells in the OmniCell 6X accommodates standard culture dishes with dedicated temperature sensing and premixed CO2/O2 tri-gas injection.',
    price: '₹8,50,000 – ₹11,20,000',
    priceType: 'range',
    inStock: true,
    isFeatured: true,
    image: incubatorImg,
    features: [
      '6 separate chambers with dedicated magnetic heated lids',
      'CO2 and O2 regulation with solid-state NDIR and optical sensors',
      'Rapid gas recovery (< 1.5 minutes) and thermal recovery (< 2 minutes)',
      'Continuous data logging and audible laboratory alarm outputs'
    ],
    specs: [
      { key: 'Make / Importer', value: 'ART Solution' },
      { key: 'Chambers', value: '6 Independent isolated cultivation chambers' },
      { key: 'Gas Atmosphere', value: 'Tri-Gas (CO2: 2.0-10.0%, O2: 1.0-20.0%)' },
      { key: 'Gas Recovery Time', value: '< 90 seconds after chamber opening' },
      { key: 'FY 25-26 Cust Supply Rate', value: '₹8,50,000' }
    ]
  },
  {
    id: 'prod-micromanipulator-icsi',
    name: 'PrecisionICSI Hydraulic Micromanipulator System',
    category: 'Micromanipulation & Laser',
    modelNumber: 'P-ICSI-900',
    makeImporter: 'ART Solution Engineering',
    packSize: '1 Dual Head Manipulator Set',
    rate: 1450000,
    shortDesc: 'Zero-drift 3-axis hydraulic manipulator for delicate intracytoplasmic sperm injection and biopsy.',
    fullDesc: 'The PrecisionICSI hydraulic micromanipulation system ensures zero drift during prolonged microinjection procedures. Equipped with micro-fine 0.1 µm positional resolution and ultra-smooth joystick controls.',
    price: '₹14,50,000',
    priceType: 'fixed',
    inStock: true,
    isFeatured: true,
    image: micromanipulatorImg,
    features: [
      'Sub-micron zero-drift oil hydraulic transmission',
      'Ergonomic dual 3D joysticks for holding and injection tools',
      'Universal mounting brackets compatible with Olympus, Nikon, Zeiss, Leica',
      'Integrated quick-action angle adjusters'
    ],
    specs: [
      { key: 'Make / Importer', value: 'ART Solution' },
      { key: 'Movement Resolution', value: '0.1 micrometer smooth hydraulic feedback' },
      { key: 'Travel Range', value: 'X: 30mm, Y: 30mm, Z: 30mm' },
      { key: 'Drift Rate', value: '< 0.05 µm / hour at 22°C ambient' },
      { key: 'FY 25-26 Cust Supply Rate', value: '₹14,50,000' }
    ]
  },
  {
    id: 'prod-turnkey-cleanroom-modular',
    name: 'CleanRoom ISO Class 5 Turnkey Modular Lab Setup',
    category: 'Turnkey Lab Setup',
    modelNumber: 'CR-MOD-ISO5',
    makeImporter: 'ART Solution Engineering',
    packSize: 'Complete Turnkey Architectural Fitout',
    rate: 3500000,
    shortDesc: 'Complete modular cleanroom infrastructure including HVAC, pass-boxes, medical gas lines, and validation.',
    fullDesc: 'End-to-end embryology cleanroom engineering designed according to ISO 14644-1 Class 5 and ESHRE recommendations. Includes flush antistatic wall panels, epoxy flooring, ceiling HEPA fan-filter units, and medical gas manifold.',
    price: '₹35,00,000 onwards',
    priceType: 'inquire',
    inStock: true,
    isFeatured: true,
    image: cleanroomImg,
    features: [
      'Positive pressure differential cascade design',
      'VOC-free architectural wall panelling with coved seamless corners',
      'Dual HVAC redundant cooling with precise RH (40-50%) control',
      'Complete IQ/OQ/PQ commissioning and regulatory audit certification'
    ],
    specs: [
      { key: 'Make / Importer', value: 'ART Solution' },
      { key: 'Cleanliness Class', value: 'ISO 14644-1 Class 5 / Class 100 at workstations' },
      { key: 'Medical Gas Supply', value: 'CO2, N2, Tri-Gas auto-switch manifolds' },
      { key: 'Compliance Certifications', value: 'ISO 13485:2016, GMP, ESHRE Guidelines' },
      { key: 'FY 25-26 Cust Supply Rate', value: 'Project estimate upon floorplan consultation' }
    ]
  },`);

// Now add each raw item from PDF
const seenSlugs = new Set();
rawItems.forEach((item, index) => {
  let baseSlug = 'prod-' + slugify(item.desc);
  if (seenSlugs.has(baseSlug)) {
    baseSlug = baseSlug + '-' + (index + 1);
  }
  seenSlugs.add(baseSlug);

  const priceStr = '₹' + item.rate.toLocaleString('en-IN');
  let imgVar = 'mediaVialsImg';
  if (item.imgType === 'catheter') imgVar = 'catheterImg';
  else if (item.imgType === 'labware') imgVar = 'labwareImg';
  else if (item.imgType === 'cryo') imgVar = 'cryoImg';
  else if (item.imgType === 'register') imgVar = 'registerImg';
  else if (item.imgType === 'tips') imgVar = 'catheterImg';

  const shortDesc = `${item.desc} by ${item.make}. Pack size: ${item.pack}. Official FY 25-26 commercial supply rate: ${priceStr}.`;
  const fullDesc = `${item.desc} is an authentic clinical-grade product manufactured/imported by ${item.make}. Specifically validated for assisted reproduction technology (ART) and clinical embryology laboratory procedures. Available in official pack configuration: ${item.pack}. All batches are sterility certified and MEA tested for clinical compliance.`;

  lines.push(`  {
    id: '${baseSlug}',
    name: ${JSON.stringify(item.desc)},
    category: ${JSON.stringify(item.cat)},
    modelNumber: 'ART-${item.make.toUpperCase().replace(/[^A-Z0-9]/g, '')}-${String(index + 101).padStart(3, '0')}',
    makeImporter: ${JSON.stringify(item.make)},
    packSize: ${JSON.stringify(item.pack)},
    rate: ${item.rate},
    price: '${priceStr}',
    priceType: 'fixed',
    inStock: true,
    isFeatured: ${!!item.isFeatured},
    image: ${imgVar},
    shortDesc: ${JSON.stringify(shortDesc)},
    fullDesc: ${JSON.stringify(fullDesc)},
    features: [
      'Make / Importer: ${item.make}',
      'Pack Size: ${item.pack}',
      'FY 25-26 Cust Supply Rate: ${priceStr}',
      'High clinical embryology reliability and batch certification'
    ],
    specs: [
      { key: 'Make / Importer', value: ${JSON.stringify(item.make)} },
      { key: 'Pack Size', value: ${JSON.stringify(item.pack)} },
      { key: 'FY 25-26 Cust Supply Rate', value: '${priceStr}' },
      { key: 'Commercial Validity', value: '31st March 2026' },
      { key: 'Taxes & Forwarding', value: 'Exclusive of taxes; freight extra at actuals' }
    ]
  }${index < rawItems.length - 1 ? ',' : ''}`);
});

lines.push(`];`);
lines.push(``);

fs.writeFileSync('src/data/artProducts.ts', lines.join('\n'), 'utf8');
console.log('Successfully written src/data/artProducts.ts with ' + (rawItems.length + 4) + ' products.');
