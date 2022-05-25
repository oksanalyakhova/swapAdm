<template>
  <AccountLayout>
    <template #title>
      <h2>Overview</h2>
    </template>
    <template #content>
      <div class="dashboard">
        <TransactionsValue />
        <div class="dashboard-rating">
          <DepositTop />
          <WithdrawalTop />
        </div>
      </div>
    </template>
  </AccountLayout>
</template>

<script>
import AccountLayout from "../../components/AccountLayout";
import DepositTop from "./partials/DepositTop";
import WithdrawalTop from "./partials/WithdrawalTop";
import TransactionsValue from "./partials/TransactionsValue";

export default {
  name: "Dashboard",
  components: {TransactionsValue, WithdrawalTop, DepositTop, AccountLayout},
}
</script>

<style lang="scss">
  @import '../../assets/styles/layout/dashboard';
</style>
