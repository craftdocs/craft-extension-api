# Change Log

## 0.0.4
`This API version is supported from Craft 2.0.2 on Mac and also in the Web App`
- Added support for inserting the following block types: **urlBlock**, **tableBlock**, **imageBlock**, **videoBlock**, **fileBlock**, **drawingBlock**
- Added support for updating existing blocks of the following block types: **urlBlock**, **imageBlock**, **videoBlock**, **fileBlock**, **drawingBlock**
- Fixed focus handling issues in the Mac app when selecting text fields and dropdowns in an extension
- Fixed race condition in the Mac app that sometimes caused the **craft** object to be unavailable shortly after an extension has loaded
- _Breaking change:_ **fillColor** property in **CraftTableCell** has been moved inside the new **style** property

### Known limitations:

- Downloading previews and additional metadata in the Web App has limited capabilities (e.g. preview or some metadata won't be generated) compared to the Mac app (it is also affected by the CORS security settings of the inserted URL)