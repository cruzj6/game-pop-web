extern crate web_sys;

// Macros for logging to the browser console
#[macro_export]
macro_rules! console_log {
    ( $( $t:tt )* ) => { // Matches all characters infinitely
        web_sys::console::log_1(&format!( $($t)* ).into()); // Drop all characters into the format call
    };
}

#[macro_export]
macro_rules! console_error {
    ( $( $t:tt )* ) => {
        web_sys::console::error_2(&format!( $($t)* ).into());
    };
}


pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}
