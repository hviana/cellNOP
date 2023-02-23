# cellNOP

Framework for Notification Oriented Paradigm with original logic-causal
inference core developed with notifying cells.

## Contents

- [Sample application](#sample-application)

## Sample application

This example contains a segmentation module for CRM systems. The example segment
is for customers who made a purchase and accessed the "Blue Shirt" product page.

```typescript
import {
  Action,
  Condition,
  fbeMetaclass,
  Instigation,
  NotifyingHolon,
  Premise,
  Rule,
} from "https://raw.githubusercontent.com/hviana/cellNOP/main/mod.ts";

const ClientFBE = fbeMetaclass(
  "lastPurchase",
  "lastPageAccessed",
  function purchase(im: any, data: { [key: string]: any }) {
    return {
      lastPurchase: `Order ${Date.now()}`,
    };
  },
  function accessPageBlueTshirt(im: any, data: { [key: string]: any }) {
    return {
      lastPageAccessed: `Blue T-shirt`,
    };
  },
);
const SegmentFBE = fbeMetaclass(
  "clients",
  function addClientX(im: any, data: { [key: string]: any }) {
    if (!im["clients"]) {
      im["clients"] = [];
    }
    im["clients"].push("Client X");
    return {
      clients: im["clients"],
    };
  },
);

const clientX = new ClientFBE();
const segmentY = new SegmentFBE();
const premise1 = new NotifyingHolon({
  f: Premise.leftIsNot(undefined),
});
const premise2 = new NotifyingHolon({
  f: Premise.leftIs("Blue T-shirt"),
});
const condition = new NotifyingHolon({
  f: Condition.and,
});
const rule = new NotifyingHolon({
  f: Rule.default,
});
const action = new NotifyingHolon({
  f: Action.default,
});
const instigation = new NotifyingHolon({
  f: Instigation.default,
});
clientX.lastPurchase.connect({ left: premise1 });
clientX.lastPageAccessed.connect({ left: premise2 });
premise1.connect({ 1: condition });
premise2.connect({ 2: condition });
condition.connect({ default: rule });
rule.connect({ default: action });
action.connect({ default: instigation });
instigation.connect({ default: segmentY.addClientX });
```
