<template>
  <div class="lost-shipments bg-danger lighten-30 row p-3 pb-1">
    <div class="col-12">
      <div class="row justify-content-center">
        <div class="col-12">
          <h2 class="mt-1 text-danger darken-10">Lost Shipments</h2>
          <div class="mt-1 text-grey">(What are they? Where are they?)</div>
          <hr class="w-50 mt-2 border-bottom border-danger" />
        </div>
        <div class="col-md-12 p-2 border-example text-dark">
          <b>Shipment model complete</b>
          <hr class="w-50 mt-2 border-bottom border-danger" />
          <div class="property" v-for="(value, key) in shipmentModel" :key="key">
            <span class="key text-primary">{{ key }}</span>
            :
            <span class="text-grey" :class="{ redacted: value == '[REDACTED]' }" v-html="value"></span>
          </div>
        </div>
        <p></p>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup() {
    const state = reactive({

    })
    return {
      shipmentModel: {
        recipient: `Name of shipment's receiver`,
        trackingNumber: 'Alphanumeric code used to track and identify shipments, formatted as such ###-###-#',
        description: `String description of package contents
              <span class="text-danger key">[omitted]</span>`,
        shippingTier: `[INTERPLANETARY/DOMESTIC, 2LTYR, 1LTYR, METEOR-FREIGHT, GALAXY-EXPRESS, WARP, WARP+, WARP-FREIGHT]`,
        shippingCost: `Cost based off 'shippingTier' as follows: [25, 50, 70, 50, 40, 75, 95, 100]`,
        currency: 'Must be on of the Union accepted Currency; Union, KITCOIN, M0nSER4T, Scratch, Ca+N!p',
        insured: 'Whether the shipment is insured under the flat rate shipping insurance (50)',
        pirateCoverage: 'Whether the shipment has coverage for the case of any delays or damages cause by pirates (25)',
        totalCost: 'Calculated cost based the shippingCost, insured and pirateCoverage values, adjusted for Currency values',
        dateFormat: 'Date format local to recipient [Sol, Tera, Minkow, Dominion]',
        shippingDate: 'Date of shipment sent formatted to match date format',
        postalStation: 'Postal station shipment was registered at',
        sector: `Coordinates of senders' and receiver's radii`,
        inQuadrant: 'If delivery personal need pass-phrase to enter secure quadrant',
        quadrantCode: 'If applicable, code to acquire pass-phrase to enter quadrant',
        id: '[REDACTED]',
        galaxy: 'Galaxy of shipping coverage',
        planet: 'Planet for shipment to be delivered to',
        planetNumber: 'Number data for planet as discovered',
        planetCode: 'System code for shipment system to identify planet',
        containsHazard: 'Whether the shipment contents and effects are hazardous to feline health',
        hazard: 'If applicable, details shipments hazardous contents and effects'

      }
    }
  }
};
</script>


<style lang="scss" scoped>
b {
  font-size: 1.1em;
}

.row {
  position: relative;
}

.lost-shipments {
  min-height: 100%;
  background: linear-gradient(0deg, #f7d8d6e5 0%, #f7d8d6de 100%),
    url("../assets/img/CUPS-Logo.png"),
    url("../assets/img/Textures/light-paper-fibers.png");
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
}

.border-example {
  border: 2px dashed #dd5f57;
  border-radius: 2px;
}

.key {
  font-weight: bold;
}

.redacted {
  color: var(--bs-danger) !important;
  padding: 2px;
  border-radius: 5px;
  background-color: black;
}
</style>
