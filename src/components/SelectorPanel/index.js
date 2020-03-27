import React from "react";
import * as styles from "./styles.module.less";
import { Spacer } from "@components/Utils";

import {
  PackageSelect,
  FeatureSelect,
  ProductSelect,
  CustomerSelect
} from "./SelectFields";

function SelectorPanel({
  // customer props
  customers,
  customer,
  onCustomerChange,

  // product props
  products,
  product,
  onProductChange,

  //feature props
  features,
  feature,
  onFeatureChange,

  // package props (package is a reserved word)
  packages,
  pack,
  onPackageChange
}) {
  return (
    <div>
      <div className={styles.selectorCo}>
        <span>Customer</span>
        <CustomerSelect
          customer={customer}
          customers={customers}
          onCustomerChange={onCustomerChange}
        />
      </div>

      <Spacer />

      <div className={styles.selectorCo}>
        <span>Product</span>
        <ProductSelect
          product={product}
          products={products}
          onProductChange={onProductChange}
        />
      </div>

      {onFeatureChange && (
        <>
          <Spacer />
          <div className={styles.selectorCo}>
            <span>Feature</span>
            <FeatureSelect
              features={features}
              feature={feature}
              onFeatureChange={onFeatureChange}
            />
          </div>
        </>
      )}

      {onPackageChange && (
        <>
          <Spacer />
          <div className={styles.selectorCo}>
            <span>Package</span>
            <PackageSelect
              packages={packages}
              pack={pack}
              onPackageChange={onPackageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default SelectorPanel;
