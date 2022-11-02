import { AppStore } from "./AppStore";
import { DomainStore } from "./DomainStore";

export class RootStore {
  appStore: AppStore
  domainStore: DomainStore

  constructor() {
    this.appStore = new AppStore(this)
    this.domainStore = new DomainStore(this)
  }
}
