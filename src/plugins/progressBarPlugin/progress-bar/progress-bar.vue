<template>
  <div class="progress-component-wrapper">
    <div class="progress" v-if="show">
      <!-- Request -->
      <div v-if="state === 'request'">
        <div class="bar bar-request"></div>
        <div class="bar bar-request-chasing"></div>
      </div>
      <!-- Response -->
      <div v-if="state === 'response'">
        <div class="bar bar-response"></div>
        <div class="bar bar-response-chasing"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { state } from "../index.js";
import { map } from "rxjs/operators";

export default {
  name: "ProgressBarComponent",
  data() {
    return {
      show: false,
      state: null
    };
  },
  subscriptions() {
    return {
      state$: state.pipe(
        map(state => {
          if (state === "request") {
            this.state = "request";
            this.show = true;
          } else if (state === "response") {
            this.state = "response";
          } else {
            this.state = null;
            this.show = false;
          }
        })
      )
    };
  }
};
</script>

<style lang="scss" scoped>
$primary-color: red;
$background-opacity: 25%;
$bar-height: 3px;
$request-speed: 1.5s;
$response-speed: 0.7s;
$request-delay: 0.4s;
$response-delay: 0.1s;

.progress-component-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.progress {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: $bar-height;
  background-color: lighten(
    $color: $primary-color,
    $amount: $background-opacity
  );
  overflow: hidden;

  .bar {
    position: absolute;
    left: -100%;
    height: 100%;
    width: 100%;
    background-color: $primary-color;
  }

  .bar-response {
    animation: responseBar $response-speed infinite ease-in;
    animation-delay: 0;
  }

  .bar-response-chasing {
    animation: responseBar $response-speed infinite ease-in;
    animation-delay: $response-delay;
  }

  .bar-request-chasing {
    animation: requestBar $request-speed infinite,
      requestScaling $request-speed infinite;
    animation-delay: 0;
  }

  .bar-request {
    animation: requestBar $request-speed infinite ease-in,
      requestScaling $request-speed infinite ease-in;
    animation-delay: $request-delay;
  }
}

@keyframes requestBar {
  0% {
    left: -80%;
  }
  100% {
    left: 70%;
  }
}

@keyframes requestScaling {
  0% {
    animation-timing-function: linear;
    transform: scaleX(0.1);
  }
  15% {
    animation-timing-function: cubic-bezier(0.33473, 0.12482, 0.78584, 1);
    transform: scaleX(0.3);
  }
  40% {
    transform: scaleX(0.75);
  }
  60% {
    animation-timing-function: cubic-bezier(0.22573, 0, 0.23365, 1.37098);
    transform: scaleX(0.35);
  }
  100% {
    transform: scaleX(0.1);
  }
}

@keyframes responseBar {
  0% {
    left: 100%;
  }
  100% {
    left: -100%;
  }
}
</style>
