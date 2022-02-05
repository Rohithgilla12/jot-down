#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, Manager, SystemTrayEvent};
use tauri_plugin_positioner::{Positioner, Position, WindowExt, on_tray_event};

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  let show = CustomMenuItem::new("show".to_string(), "Show");
  let tray_menu = SystemTrayMenu::new()
    .add_item(show)
    .add_item(hide)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(quit);

  let system_tray = tauri::SystemTray::new().with_menu(tray_menu);

  tauri::Builder::default()
    .system_tray(system_tray)
    .plugin(Positioner::default())
    .setup(|app| {
      let win = app.get_window("main").unwrap();
      let _ = win.set_always_on_top(true);
      

      tauri::async_runtime::spawn(async move {
        let _ = win.move_window(Position::TopRight);
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
          win.show().unwrap();
          win.set_focus().unwrap();
          // win.show_window_as_active().unwrap();
          let _ = win.move_window(Position::TrayCenter);
        }
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
