import { createEffect, forward, createEvent, restore } from "effector";

const getCapha = createEvent();

const getCaphaFx = createEffect(async () => {
  const response = await fetch(
    "https://academtest.ilink.dev/reviews/getCaptcha"
  )
    .then((response) => response.text())
    .then((response) => JSON.parse(response));
  return response;
});

forward({
  from: getCapha,
  to: getCaphaFx,
});

const $capha = restore(getCaphaFx, null);

const $isLoadingCapha = getCaphaFx.pending;

export const caphaStore = {
  getCapha,
  $capha,
  $isLoadingCapha,
};
