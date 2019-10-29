export function handleLogout  () {
    fetch("/LogoutAPI/", {
        headers: { "Content-Type": "application/json" },
        mode: "same-origin",
        method: "GET",
    })
};