"""Scalar external tasks for Pybricks Blocks, backed by MBC_UniCam.py.

Import both files into the editor. The camera is connected to Port.C.
Call camera_mode once before the reading loop. All exported tasks are async.
"""

from pybricks.parameters import Port
from MBC_UniCam import UniCam

_cam = UniCam(Port.C, mode=13, multitask=True)


async def camera_mode(mode):
    return await _cam.set_mode(mode)


async def camera_read(field, index):
    """Read a scalar. index selects a color, point, or object (starting at 1).

    For fields without an index, pass 1; the index is ignored.
    None means no successful reading yet; sensor_ok returns a boolean.
    """
    indexed = ('x', 'y', 'found', 'area', 'count', 'hue', 'sat', 'val',
               'object', 'object_found', 'object_color', 'object_shape',
               'object_area')
    scalar = ('colors_found', 'total', 'near', 'mid', 'far', 'angle',
              'width', 'flags', 'junction', 'junction_dist', 'far_width',
              'lost', 'object_count', 'sensor_ok', 'max_color',
              'max_point', 'max_object', 'mode_number')
    if field in indexed:
        return await getattr(_cam, field)(index)
    if field in scalar:
        return await getattr(_cam, field)()
    pairs = {
        'cell_x': ('cell', 0), 'cell_y': ('cell', 1),
        'w': ('size', 0), 'h': ('size', 1),
        'object_x': ('object_xy', 0), 'object_y': ('object_xy', 1),
        'object_w': ('object_size', 0), 'object_h': ('object_size', 1),
    }
    if field in pairs:
        method, position = pairs[field]
        result = await getattr(_cam, method)(index)
        return None if result is None else result[position]
    if field in ('left', 'right', 'marker_color', 'marker_count'):
        method = 'edges' if field in ('left', 'right') else 'marker'
        position = 0 if field in ('left', 'marker_color') else 1
        result = await getattr(_cam, method)()
        return None if result is None else result[position]
    if field == 'order':
        result = await _cam.order()
        if result is None:
            return None
        return result[index - 1] if 1 <= index <= len(result) else 0
    raise ValueError('Unknown camera field: ' + field)
