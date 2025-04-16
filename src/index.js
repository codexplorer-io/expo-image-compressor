import { manipulateAsync } from 'expo-image-manipulator';
import { getFitSize } from '@codexporer.io/placeholder-size-calculator';

export const compress = async ({
    uri,
    sourceWidth,
    sourceHeight,
    maxWidth,
    maxHeight
}) => {
    if (sourceWidth <= maxWidth && sourceHeight <= maxHeight) {
        return {
            uri,
            width: sourceWidth,
            height: sourceHeight
        };
    }

    const {
        width: fitWidth,
        height: fitHeight
    } = getFitSize({
        sourceWidth,
        sourceHeight,
        maxWidth,
        maxHeight
    });

    const {
        uri: targetUri,
        width: targetWidth,
        height: targetHeight
    } = await manipulateAsync(
        uri,
        [
            {
                resize: {
                    width: fitWidth,
                    height: fitHeight
                }
            }
        ]
    );

    return {
        uri: targetUri,
        width: targetWidth,
        height: targetHeight
    };
};
