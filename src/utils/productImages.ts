/**
 * ART MEDICAL - Accurate IVF & Embryology Product Image Resolver
 * Ensures every product displays a realistic, professional, and visually accurate
 * image corresponding to its actual clinical name, manufacturer, and category.
 */

export const CLINICAL_IMAGE_MAP = {
  // Media & Liquids
  mediaHitech: '/images/products/media_vials_hitech.jpg',
  mediaFertipro: '/images/products/media_vials_fertipro.jpg',
  mediaCulture: '/images/products/media_culture_liquid.jpg',
  mediaVialsGeneric: '/images/assets/art_media_vials_1790759397048.jpg',
  enzymeHyaluronidase: '/images/products/hyaluronidase_enzyme_vial.jpg',

  // Catheters, Needles & Cannulas
  catheterEmbryoTransfer: '/images/products/catheter_transfer_set.jpg',
  embryoTransferCatheter: '/images/products/embryo_transfer_catheter.jpg',
  catheterTransferSet: '/images/products/catheter_transfer_set.jpg',
  catheterIUI: '/images/products/iui_catheter_flexible.jpg',
  needlesOPU: '/images/products/ovum_pickup_needle.jpg',
  ovumPickupNeedle: '/images/products/ovum_pickup_needle.jpg',
  cathetersGeneric: '/images/assets/art_catheters_cannula_1790759417050.jpg',

  // Micropipettes & Stripper Tips
  micropipetteBiopsy: '/images/products/biopsy_micropipette.jpg',

  // Cryopreservation & Vitrification
  vitrificationKit: '/images/products/vitrification_kit_straw.jpg',
  cryoVials: '/images/products/cryo_storage_vials.jpg',
  cryoDevicesGeneric: '/images/assets/art_cryo_devices_1790759458406.jpg',
  frozenSemenCryocan: '/images/assets/frozen_semen_cryocan.jpg',

  // Disposables & Labware
  falconDish: '/images/products/falcon_dish_culture.jpg',
  falconTubes: '/images/products/falcon_tubes_50ml.jpg',
  petriDishes: '/images/products/labware_petri_dishes.jpg',
  labwareGeneric: '/images/assets/art_petri_labware_1790759431806.jpg',

  // Clinical Registers & Documentation
  clinicalRegisters: '/images/products/registers_clinical_docs.jpg',
  registersGeneric: '/images/assets/art_clinic_registers_1790759495328.jpg',

  // Instrumentation & Cleanroom
  workstationLaminar: '/images/products/workstation_laminar_hood.jpg',
  incubatorBenchtop: '/images/products/equipment_incubator_lab.jpg',
  microscopeICSI: '/images/products/microscope_icsi_rig.jpg',
  cleanroomSuite: '/images/products/cleanroom_embryo_suite.jpg',
  seniorEmbryologist: '/images/assets/senior_embryologist_backup.jpg',
};

/**
 * Resolves a visually accurate, authentic image for any product based on its name, make, and category.
 */
export function resolveProductImage(product: {
  image?: string;
  name?: string;
  category?: string;
  makeImporter?: string;
}): string {
  const name = (product.name || '').toLowerCase();
  const category = (product.category || '').toLowerCase();
  const make = (product.makeImporter || '').toLowerCase();

  // If already a valid local JPG from our assets or products directory, keep it
  if (product.image && product.image.endsWith('.jpg') && !product.image.includes('.svg')) {
    return product.image;
  }

  // 1. Specific product name matches
  if (name.includes('vitrification') || name.includes('cryotech') || name.includes('straw') || name.includes('reproplate') || name.includes('vitrifit')) {
    return CLINICAL_IMAGE_MAP.vitrificationKit;
  }

  if (name.includes('cryovial') || name.includes('cryo tube') || name.includes('cryo-vial') || name.includes('sperm freez') || name.includes('freezing medium')) {
    return CLINICAL_IMAGE_MAP.cryoVials;
  }

  if (name.includes('hyaluronidase') || name.includes('pvp') || name.includes('enzyme') || name.includes('recombinant')) {
    return CLINICAL_IMAGE_MAP.enzymeHyaluronidase;
  }

  if (name.includes('ovum') || name.includes('opu') || name.includes('aspiration needle') || name.includes('single lumen') || name.includes('double lumen') || name.includes('wallace ons') || name.includes('wallace dns')) {
    return CLINICAL_IMAGE_MAP.ovumPickupNeedle;
  }

  if (name.includes('embryo transfer') || name.includes('etc') || name.includes('allwin bt etc') || name.includes('wallace peb') || name.includes('wallace pes') || name.includes('wallace ce') || name.includes('sureview') || name.includes('echogenic')) {
    if (name.includes('peb') || name.includes('pes') || name.includes('ce 123') || name.includes('ce 18') || name.includes('cannula')) {
      return CLINICAL_IMAGE_MAP.embryoTransferCatheter;
    }
    return CLINICAL_IMAGE_MAP.catheterTransferSet;
  }

  if (name.includes('iui catheter') || name.includes('surelife') || name.includes('intrauterine cannula') || name.includes('insemination cannula')) {
    return CLINICAL_IMAGE_MAP.catheterIUI;
  }

  if (name.includes('stripper') || name.includes('pipette') || name.includes('holding') || name.includes('injection needle') || name.includes('biopsy')) {
    return CLINICAL_IMAGE_MAP.micropipetteBiopsy;
  }

  if (name.includes('tube') || name.includes('falcon 15') || name.includes('falcon 50') || name.includes('conical') || name.includes('centrifuge')) {
    return CLINICAL_IMAGE_MAP.falconTubes;
  }

  if (name.includes('dish') || name.includes('35mm') || name.includes('60mm') || name.includes('4-well') || name.includes('4 well') || name.includes('center well') || name.includes('cwd') || name.includes('icsi dish') || name.includes('petri')) {
    return CLINICAL_IMAGE_MAP.falconDish;
  }

  if (name.includes('register') || name.includes('logbook') || name.includes('clinical record') || name.includes('documentation') || name.includes('book')) {
    return CLINICAL_IMAGE_MAP.clinicalRegisters;
  }

  if (name.includes('workstation') || name.includes('laminar') || name.includes('hood') || name.includes('flow cabinet')) {
    return CLINICAL_IMAGE_MAP.workstationLaminar;
  }

  if (name.includes('incubator') || name.includes('benchtop') || name.includes('tri-gas') || name.includes('co2')) {
    return CLINICAL_IMAGE_MAP.incubatorBenchtop;
  }

  if (name.includes('icsi') || name.includes('micromanipulator') || name.includes('microscope') || name.includes('inverted')) {
    return CLINICAL_IMAGE_MAP.microscopeICSI;
  }

  if (name.includes('fertipro') || make.includes('fertipro') || name.includes('sil-select')) {
    return CLINICAL_IMAGE_MAP.mediaFertipro;
  }

  if (name.includes('hitech') || make.includes('hitech')) {
    return CLINICAL_IMAGE_MAP.mediaHitech;
  }

  if (name.includes('media') || name.includes('flushing') || name.includes('htf') || name.includes('sperm wash') || name.includes('gradient') || name.includes('oil') || name.includes('sage')) {
    return CLINICAL_IMAGE_MAP.mediaCulture;
  }

  // 2. Fallbacks by Category
  if (category.includes('media')) {
    return CLINICAL_IMAGE_MAP.mediaCulture;
  }
  if (category.includes('needle') || category.includes('catheter')) {
    return CLINICAL_IMAGE_MAP.catheterEmbryoTransfer;
  }
  if (category.includes('oil') || category.includes('gradient')) {
    return CLINICAL_IMAGE_MAP.mediaFertipro;
  }
  if (category.includes('cryo') || category.includes('vitrification')) {
    return CLINICAL_IMAGE_MAP.vitrificationKit;
  }
  if (category.includes('pipette') || category.includes('stripper')) {
    return CLINICAL_IMAGE_MAP.micropipetteBiopsy;
  }
  if (category.includes('disposable') || category.includes('labware')) {
    return CLINICAL_IMAGE_MAP.falconDish;
  }
  if (category.includes('enzyme')) {
    return CLINICAL_IMAGE_MAP.enzymeHyaluronidase;
  }
  if (category.includes('register') || category.includes('document')) {
    return CLINICAL_IMAGE_MAP.clinicalRegisters;
  }
  if (category.includes('equipment') || category.includes('instrument')) {
    return CLINICAL_IMAGE_MAP.workstationLaminar;
  }

  // Default cleanroom / media asset
  return CLINICAL_IMAGE_MAP.mediaVialsGeneric;
}
