class SettingsController extends ControllerBase {
  constructor() {
    super(
      new SettingsModel(),
      new SettingsView()
    )
  }

  onSetActive() { return; }
}
