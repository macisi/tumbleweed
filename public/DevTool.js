import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import Dispatcher from 'redux-devtools-dispatch';

const actionCreators = {};

const DevTool = createDevTools(
  <DockMonitor
    toggleVisibilityKey={'ctrl-h'}
    changePositionKey={'ctrl-p'}
    changeMonitorKey={'ctrl-m'}
    defaultIsVisible={false}
  >
    <Dispatcher actionCreators={actionCreators} />
  </DockMonitor>
);

export default DevTool;
