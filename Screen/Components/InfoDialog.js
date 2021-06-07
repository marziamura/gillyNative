import React from 'react';
import { Paragraph, Dialog} from 'react-native-paper';
import { useTranslation } from 'react-i18next';


function InfoDialog(props){
    const { t } = useTranslation(props.text);
    return <Dialog visible={true} onDismiss={ props.callback}>
            <Dialog.Title>{t("title")}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{t("paragraph")}</Paragraph>
              {props.children}
            </Dialog.Content>
          </Dialog>
}


export default InfoDialog;
