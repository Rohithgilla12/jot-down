#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Manager, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};
use tauri_plugin_positioner::{on_tray_event, Position, Positioner, WindowExt};

fn main() {
  // let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  // let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  // let show = CustomMenuItem::new("show".to_string(), "Show");
  // let tray_menu = SystemTrayMenu::new()
  //   .add_item(show)
  //   .add_item(hide)
  //   .add_native_item(SystemTrayMenuItem::Separator)
  //   .add_item(quit);

  let system_tray = tauri::SystemTray::new(); //.with_menu(tray_menu)

  tauri::Builder::default()
    .system_tray(system_tray)
    .plugin(Positioner::default())
    .setup(|app| {
      let win = app.get_window("main").unwrap();
      let _ = win.set_decorations(false);

      tauri::async_runtime::spawn(async move {
        let _ = win.move_window(Position::TrayCenter);
      });

      Ok(())
    })
    .on_system_tray_event(|app, event| {
      on_tray_event(app, &event);
      if let SystemTrayEvent::LeftClick { .. } = event {
        let win = app.get_window("main").unwrap();
        let win_visible = win.is_visible().unwrap();
        dbg!("win_visible: {}", win_visible);
        if win_visible {
          win.hide().unwrap();
        } else {
          let logical_size = tauri::LogicalSize::<f64> {
            width: 390.00,
            height: 500.00,
          };
          let logical_s = tauri::Size::Logical(logical_size);
          win.set_size(logical_s);
          win.show().unwrap();
          win.set_focus().unwrap();
          let _ = win.move_window(Position::TrayCenter);
        }
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
