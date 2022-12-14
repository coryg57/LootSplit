const formControlList = document.getElementsByClassName(
  "form-control-with-tip"
);

const popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);

const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

popoverTriggerList.forEach((popoverTriggerEl) => {
  popoverTriggerEl.addEventListener("blur", () => {
    const popover = bootstrap.Popover.getInstance(popoverTriggerEl);
    popover.hide();
  });
});

[].slice.call(formControlList).forEach((formControl) => {
  const formControlSiblings = formControl.parentElement.children;
  const helpTipElement = [].find.call(formControlSiblings, (sibling) => {
    const classes = sibling.classList.value.split(" ");
    const index = classes.indexOf("input-group-help-tip");
    if (index !== -1) {
      return sibling;
    }
  });

  if (helpTipElement) {
    formControl.addEventListener("focus", () => {
      if (!formControl.value) {
        formControl.classList.add("form-control-with-tip-focused");
        helpTipElement.removeAttribute("hidden");
      } else {
        formControl.classList.remove("form-control-with-tip-focused");
        helpTipElement.setAttribute("hidden", true);
      }
    });

    formControl.addEventListener("input", () => {
      if (!formControl.value) {
        formControl.classList.add("form-control-with-tip-focused");
        helpTipElement.removeAttribute("hidden");
      } else {
        formControl.classList.remove("form-control-with-tip-focused");
        helpTipElement.setAttribute("hidden", true);
      }
    });
  }
});

const defaultEl = document.getElementById("default-inv-popover");

const defaultPopover = new bootstrap.Popover(defaultEl, {
  html: true,
  trigger: "hover focus",
  placement: "right",
  fallbackPlacements: ["top", "bottom", "left"],
  offset: [0, 13.6],
  content: `
    <div>
      <div class="mb-2">
        <span class="justify-content-md-center">
          Select this <em><strong>only</strong></em> if a group purchase is intended and the price paid is <em><strong>exactly</strong></em> the same as the minimum investment required for the selected bank class, defined as the following:
        </span>
      </div>
      <div>
        <div class="row row-cols-5 mb-2 g-0">
          <div class="col text-center my-auto">
            <span class="text-fleeca">Fleeca</span>
          </div>
          <div class="col text-center my-auto">
            <span class="text-paleto">Paleto</span>
          </div>
          <div class="col text-center my-auto">
            <span class="text-baycity">Bay City</span>
          </div>
          <div class="col text-center my-auto">
            <span class="text-jewelry">Jewelry Store</span>
          </div>
          <div class="col text-center my-auto">
            <span class="text-uppervault">Upper Vault</span>
          </div>
          <div class="col text-center my-auto">
            <strong>$${numberWithCommas(
              getDefaultInvestmentByBankClass("fleeca")
            )}</strong>
          </div>
          <div class="col text-center my-auto">
            <strong>$${numberWithCommas(
              getDefaultInvestmentByBankClass("paleto")
            )}</strong>
          </div>
          <div class="col text-center my-auto">
            <strong>$${numberWithCommas(
              getDefaultInvestmentByBankClass("bay-city")
            )}</strong>
          </div>
          <div class="col text-center my-auto">
            <strong>$${numberWithCommas(
              getDefaultInvestmentByBankClass("jewelry")
            )}</strong>
              </div>
          <div class="col text-center my-auto">
            <strong>$${numberWithCommas(
              getDefaultInvestmentByBankClass("upper-vault")
            )}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
});

const customEl = document.getElementById("custom-inv-popover");

const customPopover = new bootstrap.Popover(customEl, {
  html: true,
  trigger: "hover focus",
  placement: "right",
  fallbackPlacements: ["top", "bottom", "left"],
  offset: [0, 13.6],
  content: `
    <div>
      <span class="justify-content-md-center">
        Select this to specify custom prices for the investment, <em>ignoring</em> the minimum investment required for the selected bank class.
      </span>
    </div>
  `,
});

const otherEl = document.getElementById("other-payout-popover");

const otherPayout = new bootstrap.Popover(otherEl, {
  html: true,
  trigger: "hover focus",
  placement: "top",
  fallbackPlacements: ["bottom", "right", "left"],
  offset: [0, 13.6],
  content: `
    If there are any other forms of loot, e.g. gems, type the total value here.
    You can approximate the number.
  `,
});

fetch("https://api.countapi.xyz/hit/nopixel-loot-splitter/visits");
