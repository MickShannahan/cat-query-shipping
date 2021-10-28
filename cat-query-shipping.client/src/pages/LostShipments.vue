<template>
  <div class="lost-shipments bg-danger lighten-30 row p-2 pb-1">
    <div class="col-12">
      <div class="row justify-content-center">
        <div class="col-12">
          <h2 class="mt-1 text-danger darken-10">Lost Shipments</h2>
          <div class="mt-1 text-grey">(what are they?)</div>
          <hr class="w-50 mt-2 border-bottom border-danger" />
        </div>
        <div class="col-md-12 p-2 border-example text-dark">
          <b>Shipment model complete</b>
          <hr class="w-50 mt-2 border-bottom border-danger" />
          <div
            class="property"
            v-for="(value, key) in shipmentModel"
            :key="key"
          >
            <span class="key text-primary">{{ key }}</span>
            :
            <span class="text-grey" v-html="value"></span>
          </div>
        </div>
        <div class="col-md-4 p-2 border-example text-dark">
          <b>Shipment model "lost"</b>
          <hr class="w-50 mt-2 border-bottom border-danger" />
        </div>
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
        recipient: 'String name',
        trackingNumber: '###-###-###-###-#',
        description: `String description of package
              <span class="text-danger key">[ommited]</span>`,
        shippingTier: `['1LTYR', '2LTYR', 'METEOR-FREIGHT','GALAXY-EXPRESS','TELEPORT+', 'INTERPLANETARY/DOMESTIC', 'STANDARD', 'STANDARD+','WARP-FREIGHT']`,
        postageCost: `Number based off 'shippingTier'`,
        postageCrypto: 'Must be Union applicable crypto (see section on cryptos)',
        shippingDate: 'Two digit number representing day of current cycle',
        dateFormat: 'date format local to recipient',
        delivered: 'whether shipment was reported to be delivered by shipper',
        postalStation: 'postal station shipment was registered at',
        insured: 'whether the shipment was insured [true, false]',
        pirateCoverage: 'whether shipment was coverered for instance of pirate raid [true, false]',
        insuredCost: 'calculated cost based on postageCost, insured(pc x 2)and pirateCoverage(pc x 2.5)',
        insuredCrypto: 'Must be same crypto used for postageCost',
        sector: `coordinates of senders' and reciever's radii`,
        quadrant: `galaxy quadrant on quadrant grid`,
        hasQuadrantCode: 'if delivery personel need pass-phrase to enter quadrant',
        quadrantCode: 'if applicable, pass-phrase to enter quadrant.',
        galaxy: 'galaxy of origin',
        galaxyCode: `locational number data of reciver's galaxy location'`,
        planet: 'planet for shipment to be delivered to',
        planetNumber: 'number data for planet as discovered',
        planetCode: 'system code for shipment system to identify planet',
        containsHazard: 'whether the shipment contents and effects are hazardous to feline health',
        hazard: 'if applicable, details shipments hazardous contents and effects',
        creditsWorth: ''

      }
    }
  }
};
</script>


<style scoped>
@import url("../assets/scss/_variables.scss");
b {
  font-size: 1.1em;
}
.row {
  position: relative;
}

.lost-shipments {
  min-height: 100%;
  background: linear-gradient(0deg, #f7d8d6e5 0%, #f7d8d6de 100%),
    url("../assets/img/CUPS-Logo.png");
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
</style>
