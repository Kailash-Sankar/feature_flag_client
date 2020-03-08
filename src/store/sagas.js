
import { call, put, takeLatest }  from "redux-saga/effects";
import Api from './api';
import { types as reportTypes } from "./report";
import { types as featureTypes } from "./manageFeatures";
import { types as auditTypes } from "./audit";
import notify from '@utils/Notification';

function* helloSaga() {
    yield console.log('Hello Sagas!');
}

function* search(action) {
    const res = yield call(Api.search, action.params);
    yield put({ type: reportTypes.SET_RESULT, result: res });
}

function* fetchFeatures(scope, action) {
    const res = yield call(Api.fetchFeatures, action.product);
    yield put({ type: scope.SET_FEATURES, features: res });
}

function* saveData(action) {
    try {
      const res = yield call(Api.saveFeature, action.formData);
      if (res.data.status === 1) {
        notify.feature(true, action.formData.name);
        yield put({ type: featureTypes.SET_RESET });
      } else {
        notify.feature(false, res.data.message, res.data.data[0].msg);
      }
    } catch (err) {
      notify.feature(false, "Backend error", "Try posting data again");
    }
}

function* auditSearch(action) {
    const res = yield call(Api.auditSearch, action.params);
    yield put({ type: auditTypes.SET_RESULT, result: res });
}

export function*  initSaga() {
    /// report
    yield takeLatest(reportTypes.SEARCH, search);
    yield takeLatest(reportTypes.FETCH_FEATURES, fetchFeatures, reportTypes);

    // manage features
    yield takeLatest(featureTypes.SAVE, saveData);

    // audit
    yield takeLatest(auditTypes.SEARCH, auditSearch);
    yield takeLatest(auditTypes.FETCH_FEATURES, fetchFeatures, auditTypes);

    // load test
    yield helloSaga();
}
