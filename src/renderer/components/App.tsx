// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";

import { Store } from "redux";

import { HashRouter  } from "react-router-dom";

import Dropzone from "react-dropzone";

import { RootState } from "readium-desktop/renderer/redux/states";

import { lazyInject } from "readium-desktop/renderer/di";

import PageManager from "readium-desktop/renderer/components/PageManager";

import { Provider } from "react-redux";

import Dialog from "readium-desktop/renderer/components/utils/Dialog";

import FileImport from "readium-desktop/renderer/components/dialog/FileImport";

import DialogManager from "readium-desktop/renderer/components/dialog/DialogManager";

import * as dialogActions from "readium-desktop/common/redux/actions/dialog";

import { PublicationView } from "readium-desktop/common/views/publication";

import { DialogType } from "readium-desktop/common/models/dialog";

import * as styles from "readium-desktop/renderer/assets/styles/app.css";

export default class App extends React.Component<any, undefined> {
    @lazyInject("store")
    private store: Store<RootState>

    constructor(props: any) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
    }

    // Called when files are droped on the dropzone
    public onDrop(acceptedFiles: File[], rejectedFiles: File[]) {
        this.store.dispatch(
            dialogActions.open(
                DialogType.FileImport,
                { files: acceptedFiles },
        ));
    }

    public render(): React.ReactElement<{}> {
        return (
            <Provider store={ this.store }>
                <HashRouter >
                    <div className={styles.root}>
                        <Dropzone disableClick onDrop={ this.onDrop } style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}>
                        <PageManager/>
                        <DialogManager />
                        </Dropzone>
                    </div>
                </HashRouter >
            </Provider>
        );
    }
}
