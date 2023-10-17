import dbConnect from '../../../lib/dbConnect';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  const {
    query: {id},
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const task = await Task.findById(id);
        if (!task) {
          return res.status(400).json({success: false});
        }
        res.status(200).json({success: true, data: task});
      } catch (error) {
        res.status(400).json({success: false});
      }
      break;

    case 'PUT' /* Edit a model by its ID */:
      try {
        const task = await Task.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!task) {
          return res.status(400).json({success: false});
        }
        res.status(200).json({success: true, data: task});
      } catch (error) {
        res.status(400).json({success: false});
      }
      break;

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedTask = await Task.deleteOne({_id: id});
        if (!deletedTask) {
          return res.status(400).json({success: false});
        }
        res.status(200).json({success: true, data: {}});
      } catch (error) {
        res.status(400).json({success: false});
      }
      break;

    default:
      res.status(400).json({success: false});
      break;
  }
}
