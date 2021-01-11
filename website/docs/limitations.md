---
id: limitations
title: Limitations
---

- Only portrait orientation currently supported.
- There is no way to change dimensions without full re-render of the gallery.
- Debugging is not supported because of Reanimated v2 uses TurboModules. Use flipper to debug your JS Context.
- On Android tap on hold on the screen while page changes doesn't trigger animation to stop due to bug in Gesture Handler.