import {default as BootstrapRow} from 'react-bootstrap/Row'
let defaultProps = BootstrapRow.defaultProps ? BootstrapRow.defaultProps : {}
BootstrapRow.defaultProps = {...defaultProps, noGutters: true}
export default BootstrapRow
